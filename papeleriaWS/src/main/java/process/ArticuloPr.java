/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package process;

import data.Articulo;
import data.Conexion;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class ArticuloPr extends Articulo {

    public String create(Articulo articulo) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            String id = "";
            sql = "INSERT INTO \"articulos\"\n"
                    + "	VALUES (DEFAULT, '" + articulo.getNombre() + "', '" + articulo.getDescripcion() + "', '" + articulo.getCantidad() + "', '" + articulo.getValor() + "') RETURNING id;";

            ResultSet rsArticulo = c.execSQL(sql);
            while (rsArticulo.next()) {
                id = rsArticulo.getString("id");
            }

            c.desconectar();
            return id;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public String edit(Articulo articulo) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            String id = "";
            sql = "UPDATE 	\"articulos\"\n"
                    + "	SET  nombre = '" + articulo.getNombre() + "', descripcion = '" + articulo.getDescripcion() + "', cantidad = '" + articulo.getCantidad() + "', valor = '" + articulo.getValor() + "'\n"
                    + "	WHERE id = '" + articulo.getId() + "' RETURNING id;";

            ResultSet rsArticulo = c.execSQL(sql);
            while (rsArticulo.next()) {
                id = rsArticulo.getString("id");
            }

            c.desconectar();
            return id;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public String remove(String idArticulo) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            String id = "";
            sql = "DELETE FROM \"articulos\" WHERE id='" + idArticulo + "' RETURNING id;";

            ResultSet rsArticulo = c.execSQL(sql);
            while (rsArticulo.next()) {
                id = rsArticulo.getString("id");
            }
            c.desconectar();
            return id;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public void find(String idArticulo) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            sql = "SELECT * FROM \"articulos\" WHERE id = '" + idArticulo + "';";

            ResultSet rsArticulo = c.execSQL(sql);
            while (rsArticulo.next()) {
                this.setThis(rsArticulo);
            }
            c.desconectar();
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public List<Articulo> findAll() throws SQLException {
        Conexion c = new Conexion();
        String sql;
        List<Articulo> lisArticulos = new ArrayList<>();
        if (c.conectar() != null) {
            sql = "SELECT * FROM \"articulos\" ORDER BY id;";

            ResultSet rsArticulo = c.execSQL(sql);
            while (rsArticulo.next()) {
                Articulo articulo = new Articulo();

                this.setThis(rsArticulo, articulo);

                lisArticulos.add(articulo);
            }
            c.desconectar();
            return lisArticulos;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    private void setThis(ResultSet rsArticulo) throws SQLException {
        this.setId(rsArticulo.getInt("id"));
        this.setNombre(rsArticulo.getString("nombre"));
        this.setDescripcion(rsArticulo.getString("descripcion"));
        this.setCantidad(rsArticulo.getInt("cantidad"));
        this.setValor(rsArticulo.getFloat("valor"));
    }

    private void setThis(ResultSet rsArticulo, Articulo articulo) throws SQLException {
        articulo.setId(rsArticulo.getInt("id"));
        articulo.setNombre(rsArticulo.getString("nombre"));
        articulo.setDescripcion(rsArticulo.getString("descripcion"));
        articulo.setCantidad(rsArticulo.getInt("cantidad"));
        articulo.setValor(rsArticulo.getFloat("valor"));
    }
    
    public List<Articulo> findAllPedidos(String idArticulo) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        List<Articulo> lisArticulos = new ArrayList<>();
        if (c.conectar() != null) {
            sql = "SELECT *, pa.cantidad n FROM  \"articulos\" a INNER JOIN pedido_articulo pa ON a.id = pa.articulo_id WHERE pa.pedido_id = '" + idArticulo + "' ORDER BY a.id;";

            ResultSet rsArticulo = c.execSQL(sql);
            while (rsArticulo.next()) {
                Articulo articulo = new Articulo();

                this.setThis(rsArticulo, articulo);
                articulo.setCantidad(rsArticulo.getInt("n"));

                lisArticulos.add(articulo);
            }
            c.desconectar();
            return lisArticulos;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }
}
