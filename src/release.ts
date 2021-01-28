import * as github from '@actions/github'
import fs from 'fs'
import {
    Ootokit,
    Release,
    retryOnFailed,
    CreateOptions,
    UploadAssetOptions
} from './helpers'

export const getRelease = async (kit: Ootokit, code: string) => {
    let release: Release | undefined = undefined

    try {
        let res = await kit.repos.getReleaseByTag({
            ...github.context.repo,
            tag: code
        })
        release = res.data
    } catch (error) {
        console.log(`Release ${code} not found..`)
    }

    return release
}

export const deleteRelease = async (kit: Ootokit, id: number) => {
    const delRelease = async () => {
        kit.repos.deleteRelease({
            ...github.context.repo,
            release_id: id
        })
    }
    await retryOnFailed(delRelease)
}

export const deleteTagRef = async (kit: Ootokit, code: string) => {
    const tagRef = `tags/${code}`

    const deleteTagRef = async () => {
        kit.git.deleteRef({
            ...github.context.repo,
            ref: tagRef
        })
    }
    await retryOnFailed(deleteTagRef)
}

export const deleteReleaseIfExists = async (kit: Ootokit, code: string) => {
    const release = await getRelease(kit, code)

    if (!release) return
    console.log(`release "${release.name}" is exist, removing.. `)

    await deleteRelease(kit, release.id)
    console.log(`release "${release.name}" is removed! `)

    await deleteTagRef(kit, code)
    console.log(`tag ref "tags/${code}" is removed! `)
}

export const createRelease = async (kit: Ootokit, options: CreateOptions) => {
    const creRelease = async () => {
        const { name, code, body, prerelease } = options
        let res = await kit.repos.createRelease({
            ...github.context.repo,
            tag_name: code,
            target_commitish: github.context.sha,
            name,
            body,
            draft: false,
            prerelease
        })
        return res.data
    }

    return retryOnFailed(creRelease)
}

export const uploadReleaseAsset = async (
    kit: Ootokit,
    options: UploadAssetOptions
) => {
    const { source, url, target, mineType } = options
    const data = fs.readFileSync(source)

    let payload: any = {
        url,
        headers: {
            'content-type': mineType,
            'content-length': data.length
        },
        name: target,
        data: data
    }
    let res = await kit.repos.uploadReleaseAsset(payload)

    return res.data
}
