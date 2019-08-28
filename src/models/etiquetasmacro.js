let dbCOBOL = require('../dbMacro');
let existenciaModel = {};
/*
existenciaModel.getExistenciaAlm = (idalmacen,codigo, callback) => {
    console.log(idalmacen);
    console.log(codigo);
    if (dbCOBOL) {
        dbCOBOL.query(`SELECT 
                    c.ART_COD1 AS 'codigoProducto',
                    c.ART_COD2 AS 'codigoProducto2',
                    c.ART_DESC1 AS 'descripcion',
                    c.ART_PRE_1 AS 'precio',
                    b.ALM_LLAVE AS 'idalmacen',
                    b.ALM_NOMBRE AS 'almacen',
                    a.EXI_ACT as 'existenciaActual'
                 FROM
                    PUBLIC.INVEXI AS a
                        INNER JOIN
                    PUBLIC.INVALM AS b ON a.EXI_ALM = b.ALM_LLAVE
                        INNER JOIN
                    PUBLIC.INVART AS c ON a.EXI_ART = c.ART_COD1
                    WHERE b.ALM_LLAVE='` + idalmacen +`'
                    AND ART_COD1='`+codigo+`' 
                    OR b.ALM_LLAVE='` + idalmacen +`'
                    AND ART_COD2='`+codigo+`' `, function(err, rows, moreResultSets) {
            if (err) {
                console.log(err);
            }
            else {
                callback(null, rows);
            }
        }); 
    }
};
*/

existenciaModel.getExistenciaAlm = (idalmacen,codigo, callback) => {
    console.log(idalmacen);
    console.log(codigo);
    if (dbCOBOL) {
        dbCOBOL.query(`SELECT 
                    ART_COD1 AS 'codigoProducto',
                    ART_COD2 AS 'codigoProducto2',
                    ART_DESC1 AS 'descripcion',
                    ART_PRE_1 AS 'precio',
                    ART_UVEN AS 'unidadVenta',
                    ALM_LLAVE AS 'idalmacen',
                    ALM_NOMBRE AS 'almacen',
                    EXI_ACT as 'existenciaActual',
                    ART_IM1V as 'impuesto'
                 FROM
                    PUBLIC.INVEXI, 
                    PUBLIC.INVALM,
                    PUBLIC.INVART
                WHERE 
                    (((PUBLIC.INVART.ART_COD1)= '`+codigo+`')
                    AND ((PUBLIC.INVEXI.EXI_ART)='`+codigo+`')
                    AND ((PUBLIC.INVEXI.EXI_ALM)='`+idalmacen+`')
                    AND ((PUBLIC.INVALM.ALM_LLAVE)='`+idalmacen+`')
                    )
                    
                
                `, function(err, rows, moreResultSets) {
            if (err) {
                console.log(err);
            }
            else {
                callback(null, rows);
            }
        }); 
    }
};
existenciaModel.getCodigo2 = (codigo, callback) => {
    console.log(codigo);
    if (dbCOBOL) {
        dbCOBOL.query(`SELECT 
        ART_COD1
        FROM PUBLIC.INVART
        WHERE PUBLIC.INVART.ART_COD2='`+codigo+`'
    
    `, function(err, rows, moreResultSets) {
            if (err) {
                console.log(err);
            }
            else {
                callback(null, rows);
            }
        }); 
    }
};
module.exports = existenciaModel;
