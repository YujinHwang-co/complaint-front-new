export default {
  getStrDateTime(value = '') {
    const js_date = new Date(value)

    // 연도, 월, 일 추출
    const year = js_date.getFullYear()
    let month = js_date.getMonth() + 1
    let day = js_date.getDate()
    let hour = js_date.getHours()
    let min = js_date.getMinutes()

    // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
    if (month < 10) {
      month = '0' + month
    }

    if (day < 10) {
      day = '0' + day
    }
    if (hour < 10) {
      hour = '0' + hour
    }
    if (min < 10) {
      min = '0' + min
    }
    // 최종 포맷 (ex - '2021-10-08')
    return this.nvl(value, '') != '' && value != null
      ? year + '-' + month + '-' + day + ' ' + hour + ':' + min
      : ''
  },
  getStrDate(value = '', format = '-') {
    const js_date = new Date(value)

    // 연도, 월, 일 추출
    const year = js_date.getFullYear()
    let month = js_date.getMonth() + 1
    let day = js_date.getDate()

    // 월, 일의 경우 한자리 수 값이 있기 때문에 공백에 0 처리
    if (month < 10) {
      month = '0' + month
    }

    if (day < 10) {
      day = '0' + day
    }
    // 최종 포맷 (ex - '2021-10-08')
    return this.nvl(value, '') != '' ? year + format + month + format + day : ''
  },
  ipToInt(ip) {
    let ipl = 0
    ip.split('.').forEach((octet) => {
      ipl <<= 8
      ipl += parseInt(octet)
    })
    return ipl >>> 0
  },
  ipFromLong(ipl) {
    return (
      (ipl >>> 24) +
      '.' +
      ((ipl >> 16) & 255) +
      '.' +
      ((ipl >> 8) & 255) +
      '.' +
      (ipl & 255)
    )
  },
  setCurrencyComma(value) {
    // 숫자 천단위 comma찍기
    var num = new Number(value)
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
  },
  getfileSize(x) {
    // 데이터 사이즈 계산
    var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB']
    var e = Math.floor(Math.log(x) / Math.log(1024))
    return (x / Math.pow(1024, e)).toFixed(2) + ' ' + s[e]
  },
  setHyphenPhone(phoneNumber) {
    if (!phoneNumber) return phoneNumber

    phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

    let tmp = ''
    if (phoneNumber.length < 4) {
      return phoneNumber
    } else if (phoneNumber.length < 7) {
      tmp += phoneNumber.substr(0, 3)
      tmp += '-'
      tmp += phoneNumber.substr(3)
      return tmp
    } else if (phoneNumber.length == 8) {
      tmp += phoneNumber.substr(0, 4)
      tmp += '-'
      tmp += phoneNumber.substr(4)
      return tmp
    } else if (phoneNumber.length < 10) {
      if (phoneNumber.substr(0, 2) == '02') {
        //02-123-5678
        tmp += phoneNumber.substr(0, 2)
        tmp += '-'
        tmp += phoneNumber.substr(2, 3)
        tmp += '-'
        tmp += phoneNumber.substr(5)
        return tmp
      }
    } else if (phoneNumber.length < 11) {
      if (phoneNumber.substr(0, 2) == '02') {
        //02-1234-5678
        tmp += phoneNumber.substr(0, 2)
        tmp += '-'
        tmp += phoneNumber.substr(2, 4)
        tmp += '-'
        tmp += phoneNumber.substr(6)
        return tmp
      } else {
        //010-123-4567
        tmp += phoneNumber.substr(0, 3)
        tmp += '-'
        tmp += phoneNumber.substr(3, 3)
        tmp += '-'
        tmp += phoneNumber.substr(6)
        return tmp
      }
    } else {
      //010-1234-5678
      tmp += phoneNumber.substr(0, 3)
      tmp += '-'
      tmp += phoneNumber.substr(3, 4)
      tmp += '-'
      tmp += phoneNumber.substr(7)
      return tmp
    }
  },
  deleteBracket(text) {
    // 안녕 (hi) 하세요 -> 안녕 하세요
    var find1 = text.indexOf('(')
    var find2 = text.indexOf(')')
    if (find1 > -1 && find2 > -1) {
      text = text.substr(0, find1 - 1) + text.substr(find2 + 1, text.length)
    }

    return text
  },
  getTelNumValidation(value) {
    let reg = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))(\d{3,4})(\d{4})$/

    // 핸드폰일때(010, 011, 019, ..., 017)
    if (value.substr(0, 2) == '01') {
      reg = /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))(\d{4})$/
    }

    return reg.test(value)
  },
  nvl(expr1, expr2) {
    if (
      expr1 === undefined ||
      expr1 === 'undefined' ||
      expr1 == null ||
      expr1 == '' ||
      expr1 == 'null'
    ) {
      expr1 = expr2
    }
    return expr1
  },
  /* 그리드 sorting 값 */
  getGridSortData(gridApi) {
    let sortParam = {}
    let col = gridApi.columnApi.columnModel

    for (let i = 0; i < col.gridColumns.length; i++) {
      if (this.nvl(col.gridColumns[i].sort, '') != '') {
        // console.log("ssss ==> ", col.gridColumns[i]);
        // sortParam.orderKey = col.gridColumns[i].colId;
        sortParam.orderKey = col.gridColumns[i].colDef.orderKeyCol
        sortParam.direction = col.gridColumns[i].sort
        break
      }
    }

    return sortParam
  },
}
