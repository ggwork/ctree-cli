#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const argv = require('yargs')
  .version()
  .describe('a', '显示所有文件和目录')
  .describe('d', '显示目录名称而非内容')
  .describe('D', '列出文件或目录的更改时间')
  .describe('f', '在每个文件或目录之前，显示完整的相对路径名称')
  .describe('s', '列出文件或目录大小')
  .describe('t', '用文件和目录的更改时间排序')
  .help()
  .argv

// 默认使用当前目录
let currentDir = '.'
// 当前目录名称
let currentDirName = path.basename(process.cwd())
// 排除文件夹,默认把node_modules排除在遍历之外
let excludeDir = 'node_modules'
// 设置各个标识
let aFlag, dFlag, DFlag, fFlag, sFlag, tFlag, mFlag

// 根据用户的数据情况设置各个flag
if (argv.a) {
  aFlag = true
}
if (argv.d) {
  dFlag = true
}
if (argv.D) {
  DFlag = true
}
if (argv.f) {
  fFlag = true
}
if (argv.s) {
  sFlag = true
}
if (argv.t) {
  tFlag = true
}
if (argv.m) {
  mFlag = true
}




/**数据结构类型 */
/**
 * {
 *  name:'css', 文件名称
 *  type:'dir', 文件类型
 *  children:[], 子集合
 *  path:'', 路径
 *  size:'', 大小
 *  uid:'', 用户id
 *  gid:''，组id
 *  mtimeMs:'' 上一次更改时间
 *  birthtimeMs: 文件生成时间
 * }
 * 
 */

function getType(curPath) {
  let stats = fs.statSync(curPath)
  // console.log(stats)
  let statsObj = {}
  if (stats.isBlockDevice()) {
    statsObj['type'] = 'block'
  } else if (stats.isCharacterDevice()) {
    statsObj['type'] = 'characterDevice'
  } else if (stats.isDirectory()) {
    statsObj['type'] = 'dir'
  } else if (stats.isFIFO()) {
    statsObj['type'] = 'fifo'
  } else if (stats.isFile()) {
    statsObj['type'] = 'file'
  } else if (stats.isSocket()) {
    statsObj['type'] = 'socket'
  } else if (stats.stats.isSymbolicLink()) {
    statsObj['type'] = 'symbolicLink'
  }
  // 文件路径
  statsObj['path'] = path.join('./', '/test', curPath)
  // 文件所有者的用户标识
  statsObj['uid'] = stats.uid
  // 文件所在组的群组标识。
  statsObj['gid'] = stats.gid
  // 文件大小
  statsObj['size'] = stats.size
  // 最后一次修改文件的时间，单位是毫秒
  statsObj['mtimeMs'] = stats.mtimeMs
  // 创建文件的时间，单位毫秒
  statsObj['birthtimeMs'] = stats.birthtimeMs

  return statsObj
}

// 获取fs.readDir的结果。如果有-m则包含node_modules 否则不包含
function getFsReadDir(curPath) {
  let allArr = fs.readdirSync(curPath);
  // console.log('mFlag:', !!!mFlag)
  if (!!!mFlag) {
    for (let i = 0; i < allArr.length; i++) {
      if (allArr[i] == excludeDir) {
        allArr[i] = ''
      }
    }
  }
  // console.log("allArr:", allArr)
  return allArr
}

// 获取经过处理后的目录和文件对象
function getAll(curPath) {
  let allArr = clearArrayNull(getFsReadDir(curPath));
  // console.log('allArr2:', allArr)
  let dirObj = []
  allArr.forEach(function (item, index, arr) {
    let childPath = path.join(curPath, item)
    let itemAttr = {
      name: item,
    }
    let statsObj = getType(childPath)
    if (statsObj.type == "dir") {
      // console.log('childPath:', childPath)
      statsObj.children = getAll(childPath)
    }
    itemAttr = Object.assign(itemAttr, statsObj)
    dirObj.push(itemAttr)
  })
  return dirObj
}
// 删除结果里，文件名直接以没有文件名的文件，比如.bablelrc .该函数会产生稀疏数组
function clearDotFile(result) {
  for (let i = 0; i < result.length; i++) {
    if (result[i].type == "dir") {
      clearDotFile(result[i].children)
    } else if (result[i].type == 'file' && /^\./.test(result[i].name)) {
      result[i] = ''
    }
  }
  return result
}

function clearFile(result) {
  for (let i = 0; i < result.length; i++) {
    if (result[i].type == 'file') {
      result[i] = ''
    } else if (result[i].type == 'dir') {
      clearFile(result[i].children)
    }
  }
  return result
}

// 显示文件和更改时间
function getResultWithModifyTime(result) {
  result.forEach(function (item) {
    item.name = `[ ${(new Date(item.mtimeMs)).toLocaleString()} ] ${item.name}`
    if (item.type == 'dir') {
      getResultWithModifyTime(item.children)
    }
  })
  return result
}

// 去除稀疏数组中的空元素
function clearArrayNull(result) {
  // console.log('result:', result)
  let newResult = []
  result.forEach(function (item, index, arr) {
    if (item) {
      if (item.type == "dir") {
        item.children = clearArrayNull(item.children)
      }
      newResult.push(item)
    }
  })
  // console.log('newResult:', newResult)
  return newResult
}
// 获取相对路径
function getRelativeFile(result) {
  result.forEach(function (item, index, arr) {
    item.name = item.path
    if (item.type == "dir") {
      getRelativeFile(item.children)
    }
  })
  return result
}
// 显示文件的大小
function getSizeFile(result) {
  result.forEach(function (item, index, arr) {
    item.name = `[${(''+item.size).padStart(8)}]` + item.name
    if (item.type == "dir") {
      getSizeFile(item.children)
    }
  })
  return result
}
// 根据更新时间显示文件
function getResultByModifyTime(result) {
  // console.log('before result:', result)
  result.sort(function (item1, item2) {
    return item1.mtimeMs - item2.mtimeMs
  })
  result.forEach(function (item) {
    if (item.type == "dir") {
      getResultByModifyTime(item.children)
    }
  })
  return result
}
// 获取文件fs读取目录的结果
function getResult() {
  let result = getAll(currentDir)
  // 默认不显示没有文件名的文件,比如.babelrc
  if (!aFlag) {
    result = clearDotFile(result)
    // 去除稀疏数据
    result = clearArrayNull(result)
  }
  // 如何命令行中有-d，则只显示目录，不显示文件
  if (dFlag) {
    result = clearFile(result)
    // 去除稀疏数据
    result = clearArrayNull(result)
  }
  if (DFlag) {
    result = getResultWithModifyTime(result)
  }
  if (fFlag) {
    result = getRelativeFile(result)
  }
  if (sFlag) {
    result = getSizeFile(result)
  }
  if (tFlag) {
    result = getResultByModifyTime(result)
  }

  return result
}

// 目录每一级前的空格
let space = '  '

// 结果字符串
let resultStr = `
.
|-${currentDirName}`

let example =
  `
.
|-test
  |-css
  |  |-jquery-ui.css
  |  |-main.css
  |-js
  |  |-index.js
  |-hide.txt
`
let nestNum = 0

function getChildrenResultStr(result, nestNum) {
  nestNum++
  let tempResultStr = ''
  let nestSpaceStr = `${space}`.repeat(nestNum)
  result.forEach(function (item, index, arr) {
    tempResultStr += `
${nestSpaceStr}|-${item.name}`
    if (item.type == 'dir') {
      tempResultStr += getChildrenResultStr(item.children, nestNum)
    }
  })

  return tempResultStr
}

function show() {
  let result = getResult()
  resultStr += getChildrenResultStr(result, nestNum)
  console.log(resultStr)
}
show()