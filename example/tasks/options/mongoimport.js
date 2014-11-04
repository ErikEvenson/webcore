module.exports = {
  options: {
    db : 'vbez',
    collections : [
      { 
        name : 'import', 
        type : 'json', 
        file : '../VBEZ.json', 
        jsonArray : true,
        drop : true
      }
    ]
  }
}