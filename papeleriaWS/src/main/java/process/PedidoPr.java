/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package process;

import data.Articulo;
import data.Conexion;
import data.Pedido;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


public class PedidoPr extends Pedido{
    public String create(Pedido pedido) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            String id = "";
            sql = "INSERT INTO \"pedidos\"\n"
                    + "	VALUES (DEFAULT, '" + pedido.getUsuario_id()+ "', '" + pedido.getDescripcion()+ "', '" + pedido.getEstado()+ "', '" + pedido.getFecha().toString()+ "') RETURNING id;";

            ResultSet rsPedido = c.execSQL(sql);
            while (rsPedido.next()) {
                id = rsPedido.getString("id");
            }
            
            for(int i=0; i< pedido.getArticulos().size(); i++){
                Articulo articulo = pedido.getArticulos().get(i);
                sql = "INSERT INTO pedido_articulo VALUES ('" + id +  "', '" + articulo.getId() + "', '" + articulo.getCantidad() + "');";
                c.execSQL(sql);
            }
            
            c.desconectar();
            return id;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public String edit(Pedido pedido) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            String id = "";
            sql = "UPDATE 	\"pedidos\"\n"
                    + "	SET  usuario_id = '" + pedido.getUsuario_id()+ "', descripcion = '" + pedido.getDescripcion() + "', estado = '" + pedido.getEstado()+ "', fecha = '" + pedido.getFecha().toString()+ "'\n"
                    + "	WHERE id = '" + pedido.getId() + "' RETURNING id;";

            ResultSet rsPedido = c.execSQL(sql);
            while (rsPedido.next()) {
                id = rsPedido.getString("id");
            }
            
            sql = "DELETE FROM \"pedido_articulo\" WHERE pedido_id='" + id + "'";
            c.execSQL(sql);
            
            for(int i=0; i< pedido.getArticulos().size(); i++){
                Articulo articulo = pedido.getArticulos().get(i);
                sql = "INSERT INTO pedido_articulo VALUES ('" + id +  "', '" + articulo.getId() + "', '" + articulo.getCantidad() + "');";
                c.execSQL(sql);
            }
            
            c.desconectar();
            return id;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public String remove(String idPedido) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            String id = "";
            sql = "DELETE FROM \"pedidos\" WHERE id='" + idPedido + "' RETURNING id;";

            ResultSet rsPedido = c.execSQL(sql);
            while (rsPedido.next()) {
                id = rsPedido.getString("id");
            }
            c.desconectar();
            return id;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public void find(String idPedido) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            sql = "SELECT * FROM \"pedidos\" WHERE id = '" + idPedido + "';";

            ResultSet rsPedido = c.execSQL(sql);
            while (rsPedido.next()) {
                this.setThis(rsPedido);
                
                UsuarioPr usuarioPr = new UsuarioPr();
                usuarioPr.findCliente(this.getUsuario_id().toString());
                this.setCliente(usuarioPr);
            }
            c.desconectar();
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public List<Pedido> findAll() throws SQLException {
        Conexion c = new Conexion();
        String sql;
        List<Pedido> lisPedidos = new ArrayList<>();
        if (c.conectar() != null) {
            sql = "SELECT * FROM \"pedidos\" ORDER BY id;";

            ResultSet rsPedido = c.execSQL(sql);
            while (rsPedido.next()) {
                Pedido pedido = new Pedido();

                this.setThis(rsPedido, pedido);
                
                String idPedido = pedido.getId().toString();
                
                UsuarioPr usuarioPr = new UsuarioPr();
                usuarioPr.findCliente(pedido.getUsuario_id().toString());
                pedido.setCliente(usuarioPr);
                
                ArticuloPr articuloPr = new ArticuloPr();
                pedido.setArticulos(articuloPr.findAllPedidos(idPedido));
                
                lisPedidos.add(pedido);
            }
            c.desconectar();
            return lisPedidos;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }
    
    public List<Pedido> findAllCliente(String idCliente) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        List<Pedido> lisPedidos = new ArrayList<>();
        if (c.conectar() != null) {
            sql = "SELECT * FROM \"pedidos\" WHERE usuario_id = '" + idCliente + "' ORDER BY id;";

            ResultSet rsPedido = c.execSQL(sql);
            while (rsPedido.next()) {
                Pedido pedido = new Pedido();

                this.setThis(rsPedido, pedido);
                
                String idPedido = pedido.getId().toString();
                
                UsuarioPr usuarioPr = new UsuarioPr();
                usuarioPr.findCliente(pedido.getUsuario_id().toString());
                pedido.setCliente(usuarioPr);
                
                ArticuloPr articuloPr = new ArticuloPr();
                pedido.setArticulos(articuloPr.findAllPedidos(idPedido));
                
                lisPedidos.add(pedido);
            }
            c.desconectar();
            return lisPedidos;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    private void setThis(ResultSet rsPedido) throws SQLException {
        this.setId(rsPedido.getInt("id"));
        this.setUsuario_id(rsPedido.getInt("usuario_id"));
        this.setDescripcion(rsPedido.getString("descripcion"));
        this.setEstado(rsPedido.getInt("estado"));
        this.setFecha(rsPedido.getObject("fecha", LocalDate.class));
        this.setPrecio(rsPedido.getFloat("precio"));
    }

    private void setThis(ResultSet rsPedido, Pedido pedido) throws SQLException {
        pedido.setId(rsPedido.getInt("id"));
        pedido.setUsuario_id(rsPedido.getInt("usuario_id"));
        pedido.setDescripcion(rsPedido.getString("descripcion"));
        pedido.setEstado(rsPedido.getInt("estado"));
        pedido.setFecha(rsPedido.getObject("fecha", LocalDate.class));
        pedido.setPrecio(rsPedido.getFloat("precio"));
    }
}
