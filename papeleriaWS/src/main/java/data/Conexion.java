/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package data;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;


public class Conexion {
    
    private Connection conex;
    
    private final String cadena = "jdbc:postgresql://localhost:5432/papeleria";
    private final String user = "postgres";
    private final String pass = "12345";

    public String getCadena() {
        return cadena;
    }

    public String getUser() {
        return user;
    }

    public String getPass() {
        return pass;
    }

    public Conexion() {
        conex = null;
    }

    public void desconectar() throws SQLException {
        conex.close();
        conex = null;
    }

    public Connection getConex() {
        return conex;
    }

    public void setConex(Connection conex) {
        this.conex = conex;
    }

    public Connection conectar() {
        try {
            Class.forName("org.postgresql.Driver");
            conex = DriverManager.getConnection(this.getCadena(), this.getUser(), this.getPass());
        } catch (ClassNotFoundException | SQLException ex) {
            Logger.getLogger("ClaseConexion").log(Level.SEVERE, "Error al intentar conectarse a la BD", ex);
        }
        return conex;
    }

    //EJECUTAR CONSULTAS
    public ResultSet execSQL(String instruccionSQL) {
        ResultSet result = null;
        try {
            Statement stt = conex.createStatement();
            result = stt.executeQuery(instruccionSQL);
        } catch (SQLException ex) {
            Logger.getLogger("ClaseConexion").log(Level.SEVERE, "Error al ejecutar la consultaSQL", ex);
        }
        return result;
    }

    //EJECUTAR INSTRUCCIONES UPDATE
    public Integer execUPD(String instruccionSQL) {
        Integer result = null;
        try {
            Statement stt = conex.createStatement();
            result = stt.executeUpdate(instruccionSQL);
        } catch (SQLException ex) {
            Logger.getLogger("ClaseConexion").log(Level.SEVERE, "Error al ejecutar el updateSQL", ex);
        }
        return result;
    }
}
