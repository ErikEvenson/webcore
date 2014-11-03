module.exports = {
  options: {
    db : 'VBEZ',
    collections : [
      { 
        name : 'VBEZ', 
        type : 'json', 
        file : '../VBEZ.json', 
        jsonArray : true,
        drop : true
      }
    ]
  }
}