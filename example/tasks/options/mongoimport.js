module.exports = {
  options: {
    db          : 'vbez',
    collections : [
      { 
        name      : 'entities', 
        type      : 'json', 
        file      : '../VBEZ.json', 
        jsonArray : true,
        drop      : true
      }
    ]
  }
}