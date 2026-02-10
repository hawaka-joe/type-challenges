import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * 递归计算目录下的文件总数
 * @param {string} dirPath 目标目录路径
 * @returns {Promise<number>} 文件总数
 */
async function countFiles(dirPath) {
  let fileCount = 0

  try {
    const entries = await readdir(dirPath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name)

      if (entry.isDirectory()) {
        // 如果是目录，递归计算并将结果累加
        fileCount += await countFiles(fullPath)
      }
      else if (entry.isFile()) {
        // 如果是文件，计数加一
        fileCount++
      }
    }
  }
  catch (error) {
    console.error(`无法读取目录 ${dirPath}: ${error.message}`)
  }

  return fileCount
}

// 获取命令行参数中的路径，默认为当前目录
const targetPath = process.argv[2] || '.'

console.log(`正在计算: ${targetPath} ...`)

const start = Date.now()
countFiles(targetPath).then((total) => {
  const duration = Date.now() - start
  console.log('---------------------------')
  console.log(`总文件数: ${total}`)
  console.log(`耗时: ${duration}ms`)
})
