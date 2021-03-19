
const Excel = require('exceljs')
module.exports.CreateSkillsWorkbook = (data) => {
    // console.log('------------------------------------------')
    // console.log(data)
    // console.log('------------------------------------------')

    let workbook = new Excel.Workbook()

    let worksheet = workbook.addWorksheet('Skills')

    worksheet.columns = [
        {header: "Skill's _id", key: '_id'},        
        {header: "Skill's Name", key: 'name'},
        {header: "Skill's Description", key: 'description'}
        ]


    //Formating Headers To fit in length (also make them bold)
    worksheet.columns.forEach( column => {
        column.width = column.header.length < 12 ? 12 : column.header.length
    })

    worksheet.getRow(1).font = {bold: true}


    //Inserting data into worksheet
    //Dont Forget that in Excel index start from {1} !!!
    data.forEach((el, index) => {
        //const rowIndex = index + 2  // <-- Excel's index starts data 
        console.log(el)
        worksheet.addRow({
            _id: el._id,            
            name: el.name,
            description: el.description,
            // Here we can could add formulas by the following format:
            // someFormula: {
            //     formula: `=C${rowIndex}-/C${rowIndex}`
            // }
        })
        
    })


    //Formating Borders

    worksheet.eachRow({ includeEmpty: false}, function(row, rowNumber) {
        worksheet.getCell(`A${rowNumber}`).border = {
            top: {style: 'double'},
            bottom: {style: 'double'},
            left: {style: 'double'},
            right: {style: 'none'},                
        }

        worksheet.getCell(`B${rowNumber}`).border = {
            top: {style: 'double'},
            bottom: {style: 'double'},
            left: {style: 'none'},
            right: {style: 'none'},                
        }        

        worksheet.getCell(`C${rowNumber}`).border = {
            top: {style: 'double'},
            bottom: {style: 'double'},
            left: {style: 'none'},
            right: {style: 'double'},                
        }    
    })
// workbook.xlsx.writeFile('skills.xlsx') <-- If we need for history logs..(Ofc without overwriting...) 
    return workbook
}

