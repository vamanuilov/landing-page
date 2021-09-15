export const FILE_SIZE_LIMIT = 5

const customFileInput = document.querySelector('.custom-file-upload')

const removeFile = () => {
  document.getElementById('filePreview').classList.add('hidden')
}

const previewFile = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function () {
    const img = document.getElementById('previewImg')
    img.src = reader.result
    document.getElementById('filePreview').classList.remove('hidden')
  }
  const [name, type] = file.name.split('.')
  const imgName = document.getElementById('previewImgName')
  const imgType = document.getElementById('previewImgTypeAndSize')
  const fileSize = (file.size / (1024 * 1024)).toFixed(2)
  const imgTypeAndSize = `${type.toUpperCase()} ${fileSize} MB`
  imgName.innerText = name
  imgType.innerText = imgTypeAndSize
}

const handleFile = (event) => {
  const { files } = event.target
  previewFile(files[0])
}

const init = () => {
  document.getElementById('file-upload').addEventListener('change', handleFile)
  document.getElementById('trashCan').addEventListener('click', removeFile)
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
    customFileInput.addEventListener(eventName, (event) => {
      event.preventDefault()
      event.stopPropagation()
    })
  })

  customFileInput?.addEventListener('dragenter', () => {
    customFileInput.classList.add('highlight')
  })

  customFileInput?.addEventListener('dragleave', () => {
    customFileInput.classList.remove('highlight')
  })

  customFileInput?.addEventListener('drop', (data) => {
    let [file] = data.dataTransfer.files
    customFileInput.classList.remove('highlight')
    console.log('file', file)
    if (!file.type.includes('image') || file.size > FILE_SIZE_LIMIT * 1024 * 1024) {
      customFileInput.classList.add('error')
    } else {
      previewFile(file)
    }
  })
}

export default init
