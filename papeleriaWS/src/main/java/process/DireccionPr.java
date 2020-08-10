/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package process;

import data.Direccion;
import data.Conexion;
import data.Direccion;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class DireccionPr extends Direccion{
    public String create(Direccion direccion, String idUsuario) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            String id = "";
            sql = "INSERT INTO \"direcciones\"\n"
                    + "	VALUES (DEFAULT, '" + idUsuario + "', '" + direccion.getDescripcion()+ "', '" + direccion.getDescripcion()+ "') RETURNING id;";

            ResultSet rsDireccion = c.execSQL(sql);
            while (rsDireccion.next()) {
                id = rsDireccion.getString("id");
            }

            c.desconectar();
            return id;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public String edit(Direccion direccion) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            String id = "";
            sql = "UPDATE 	\"direcciones\"\n"
                    + "	SET direccion = '" + direccion.getDireccion() + "', descripcion = '" + direccion.getDescripcion() + "'\n"
                    + "	WHERE id = '" + direccion.getId() + "' RETURNING id;";

            ResultSet rsDireccion = c.execSQL(sql);
            while (rsDireccion.next()) {
                id = rsDireccion.getString("id");
            }

            c.desconectar();
            return id;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public String remove(String idDireccion) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            String id = "";
            sql = "DELETE FROM \"direcciones\" WHERE id='" + idDireccion + "' RETURNING id;";

            ResultSet rsDireccion = c.execSQL(sql);
            while (rsDireccion.next()) {
                id = rsDireccion.getString("id");
            }
            c.desconectar();
            return id;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public void find(String idDireccion) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            sql = "SELECT * FROM \"direcciones\" WHERE id = '" + idDireccion + "';";

            ResultSet rsDireccion = c.execSQL(sql);
            while (rsDireccion.next()) {
                this.setThis(rsDireccion);
            }
            c.desconectar();
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public List<Direccion> findAll() throws SQLException {
        Conexion c = new Conexion();
        String sql;
        List<Direccion> lisDireccions = new ArrayList<>();
        if (c.conectar() != null) {
            sql = "SELECT * FROM \"direcciones\" ORDER BY id;";

            ResultSet rsDireccion = c.execSQL(sql);
            while (rsDireccion.next()) {
                Direccion direccion = new Direccion();

                this.setThis(rsDireccion, direccion);

                lisDireccions.add(direccion);
            }
            c.desconectar();
            return lisDireccions;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    private void setThis(ResultSet rsDireccion) throws SQLException {
        this.setId(rsDireccion.getInt("id"));
        this.setDireccion(rsDireccion.getString("direccion"));
        this.setDescripcion(rsDireccion.getString("descripcion"));
        
    }

    private void setThis(ResultSet rsDireccion, Direccion direccion) throws SQLException {
        direccion.setId(rsDireccion.getInt("id"));
        direccion.setDireccion(rsDireccion.getString("direccion"));
        direccion.setDescripcion(rsDireccion.getString("descripcion"));
    }
    
    public List<Direccion> findAllDireccionUsuario(String idDireccion) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        List<Direccion> lisDireccions = new ArrayList<>();
        if (c.conectar() != null) {
            sql = "SELECT * FROM \"direcciones\" WHERE usuario_id = '" + idDireccion + "' ORDER BY id;";

            ResultSet rsDireccion = c.execSQL(sql);
            while (rsDireccion.next()) {
                Direccion direccion = new Direccion();

                this.setThis(rsDireccion, direccion);

                lisDireccions.add(direccion);
            }
            c.desconectar();
            return lisDireccions;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }
    
}
