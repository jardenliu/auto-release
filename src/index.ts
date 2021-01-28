import * as core from '@actions/core'
import * as github from '@actions/github'
import { getAssetsFromInput } from './helpers'

const TOKEN = core.getInput('token')
const octoKit = github.getOctokit(TOKEN)

async function run(): Promise<void> {
    const name = core.getInput('name')
    console.log('🚀 ~ file: index.ts ~ line 11 ~ run ~ name', name)
    const code = core.getInput('code')
    console.log('🚀 ~ file: index.ts ~ line 13 ~ run ~ code', code)
    const prerelease = core.getInput('prerelease') === 'true'
    console.log('🚀 ~ file: index.ts ~ line 15 ~ run ~ prerelease', prerelease)
    const recreate = core.getInput('recreate') === 'true'
    console.log('🚀 ~ file: index.ts ~ line 17 ~ run ~ recreate', recreate)
    const assets = getAssetsFromInput(core.getInput('assets'))
    console.log('🚀 ~ file: index.ts ~ line 19 ~ run ~ assets', assets)
}

run()
