/*
工具
*/ 

/* 日期化时间戳 */ 
function formatDate(timeStamp) {
    const date = new Date(timeStamp);

    const y = date.getFullYear(),
          m = date.getMonth() + 1,
          d = date.getDate(),
          h = _addZero(date.getHours()),
          i = _addZero(date.getMinutes()),
          s = _addZero(date.getSeconds())

    return `${y}年${m}月${d}日 ${h}:${i}:${s}`;
}

/* 传入的值如果小于10，就在前面加个0 */ 
function _addZero(value) {
    
    return value < 10 ? ("0" + value) : value;
}

export {
    formatDate
}