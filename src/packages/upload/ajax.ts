interface optionsType {
  file: Blob,
  filename: string,
  action: string,
  onProgress: Function,
  onSuccess: Function
  onError: Function
}

interface progress extends ProgressEvent {
  percent?: number
}

export default function ajax<T extends optionsType>(options: T) {
  const xhr = new XMLHttpRequest()
  const action = options.action
  const fd = new FormData()
  fd.append(options.filename, options.file)
  xhr.onerror = (err) => {
    options.onError(err) // 触发错误回调
  }
  xhr.onload = () => {
    let text = xhr.responseText || xhr.response
    options.onSuccess(JSON.parse(text))
  }
  console.log(ProgressEvent)
  xhr.upload.onprogress = <T extends progress>(e: T) => {
    if(e.total > 0) {
      e.percent = (e.loaded / e.total) * 100
    }
    options.onProgress(e)
  }
  // 开启请求
  xhr.open(`post`, action, true)
  // 发送请求
  xhr.send(fd) // 传递文件对应的数据
  return xhr
}