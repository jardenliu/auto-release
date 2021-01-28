import * as core from '@actions/core'
import * as github from '@actions/github'
import { getAssetsFromInput, Ootokit } from './helpers'
import {
    deleteReleaseIfExists,
    createRelease,
    uploadReleaseAsset
} from './release'

const TOKEN = core.getInput('token')
const octoKit: Ootokit = github.getOctokit(TOKEN)

async function run(): Promise<void> {
    const name = core.getInput('name')
    const code = core.getInput('code')
    const body = core.getInput('body')
    const prerelease = core.getInput('prerelease') === 'true'
    const recreate = core.getInput('recreate') === 'true'
    const assets = getAssetsFromInput(core.getInput('assets'))

    if (recreate) {
        await deleteReleaseIfExists(octoKit, code)
    }

    let release = await createRelease(octoKit, {
        name,
        code,
        body,
        prerelease
    })

    for (let i = 0; i < assets.length; i++) {
        const asset = assets[i]
        await uploadReleaseAsset(octoKit, {
            ...asset,
            url: release.upload_url
        })
    }

    core.setOutput('release', release)
}

run()
