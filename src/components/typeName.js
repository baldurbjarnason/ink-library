export function typeName (type) {
    if (type === 'Publication') {
      return 'Source'
    } else {
      return type.split(/(?=[A-Z])/).join(' ')
    }
  }