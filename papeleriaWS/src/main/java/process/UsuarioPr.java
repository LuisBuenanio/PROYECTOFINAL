/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package process;

import data.Usuario;
import data.Conexion;
import data.Direccion;
import data.Rol;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class UsuarioPr extends Usuario {

    public String create(Usuario usuario) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            String id = "";
            sql = "INSERT INTO \"usuarios\"\n"
                    + "	VALUES (DEFAULT, '" + usuario.getCedula() + "', '" + usuario.getNombre() + "', '" + usuario.getApellido() + "', '" + usuario.getTelefono() + "', '" + usuario.getDireccion() + "', '" + usuario.getCorreo() + "', '" + usuario.getPassword() + "') RETURNING id;";

            ResultSet rsUsuario = c.execSQL(sql);
            while (rsUsuario.next()) {
                id = rsUsuario.getString("id");
            }

//            List<Direccion> direcciones = usuario.getDirecciones();
//            for (int i = 0; i < direcciones.size(); i++) {
//                DireccionPr direccionPr = new DireccionPr();
//                direccionPr.create(direcciones.get(i), id);
//            }
            sql = "INSERT INTO usuario_rol\n"
                    + "VALUES\n"
                    + "	('" + id + "', '2');";
            rsUsuario = c.execSQL(sql);

            c.desconectar();
            return id;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public String edit(Usuario usuario) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            String id = "";

            if (usuario.getPassword().equals("")) {
                sql = "UPDATE 	\"usuarios\"\n"
                        + "	SET  ci = '" + usuario.getCedula() + "', nombre = '" + usuario.getNombre() + "', apellido = '" + usuario.getApellido() + "', telefono = '" + usuario.getTelefono() + "', direccion = '" + usuario.getDireccion() + "', correo = '" + usuario.getCorreo() + "'\n"
                        + "	WHERE id = '" + usuario.getId() + "' RETURNING id;";
            } else {
                sql = "UPDATE 	\"usuarios\"\n"
                        + "	SET  ci = '" + usuario.getCedula() + "', nombre = '" + usuario.getNombre() + "', apellido = '" + usuario.getApellido() + "', telefono = '" + usuario.getTelefono() + "', direccion = '" + usuario.getDireccion() + "', correo = '" + usuario.getCorreo() + "', password = '" + usuario.getPassword() + "'\n"
                        + "	WHERE id = '" + usuario.getId() + "' RETURNING id;";
            }

            ResultSet rsUsuario = c.execSQL(sql);
            while (rsUsuario.next()) {
                id = rsUsuario.getString("id");
            }

//            List<Direccion> direcciones = usuario.getDirecciones();
//            for (int i = 0; i < direcciones.size(); i++) {
//                DireccionPr direccionPr = new DireccionPr();
//                direccionPr.edit(direcciones.get(i));
//            }
            c.desconectar();
            return id;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public String remove(String idUsuario) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            String id = "";
            sql = "DELETE FROM \"usuarios\" WHERE id='" + idUsuario + "' RETURNING id;";

            ResultSet rsUsuario = c.execSQL(sql);
            while (rsUsuario.next()) {
                id = rsUsuario.getString("id");
            }
            c.desconectar();
            return id;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public void find(String idUsuario) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            sql = "SELECT * FROM \"usuarios\" WHERE id = '" + idUsuario + "';";

            ResultSet rsUsuario = c.execSQL(sql);
            while (rsUsuario.next()) {
                this.setThis(rsUsuario);

//                DireccionPr direccionPr = new DireccionPr();
//                this.setDirecciones(direccionPr.findAllDireccionUsuario(this.getId().toString()));
                RolPr rol = new RolPr();
                this.setRoles(rol.getRolesUsuario(this.getId().toString()));
            }
            c.desconectar();
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public List<Usuario> findAll() throws SQLException {
        Conexion c = new Conexion();
        String sql;
        List<Usuario> lisUsuarios = new ArrayList<>();
        if (c.conectar() != null) {
            sql = "SELECT * FROM \"usuarios\" ORDER BY id;";

            ResultSet rsUsuario = c.execSQL(sql);
            while (rsUsuario.next()) {
                Usuario usuario = new Usuario();

                this.setThis(rsUsuario, usuario);

//                DireccionPr direccionPr = new DireccionPr();
//                usuario.setDirecciones(direccionPr.findAllDireccionUsuario(usuario.getId().toString()));
                lisUsuarios.add(usuario);
            }
            c.desconectar();
            return lisUsuarios;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    private void setThis(ResultSet rsUsuario) throws SQLException {
        this.setId(rsUsuario.getInt("id"));
        this.setCedula(rsUsuario.getString("ci"));
        this.setNombre(rsUsuario.getString("nombre"));
        this.setApellido(rsUsuario.getString("apellido"));
        this.setTelefono(rsUsuario.getString("telefono"));
        this.setDireccion(rsUsuario.getString("direccion"));
        this.setCorreo(rsUsuario.getString("correo"));
    }

    private void setThis(ResultSet rsUsuario, Usuario usuario) throws SQLException {
        usuario.setId(rsUsuario.getInt("id"));
        usuario.setCedula(rsUsuario.getString("ci"));
        usuario.setNombre(rsUsuario.getString("nombre"));
        usuario.setApellido(rsUsuario.getString("apellido"));
        usuario.setTelefono(rsUsuario.getString("telefono"));
        usuario.setDireccion(rsUsuario.getString("direccion"));
        usuario.setCorreo(rsUsuario.getString("correo"));
    }

    public void findCliente(String idUsuario) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            sql = "SELECT * FROM \"usuarios\" WHERE id = '" + idUsuario + "';";

            ResultSet rsUsuario = c.execSQL(sql);
            while (rsUsuario.next()) {
                this.setThis(rsUsuario);
            }
            c.desconectar();
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    public void loginUsuario(String correo, String password) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        if (c.conectar() != null) {
            sql = "SELECT * FROM \"usuarios\" WHERE correo = '" + correo + "' AND password = '" + password + "';";

            ResultSet rsUsuario = c.execSQL(sql);
            while (rsUsuario.next()) {
                this.setThis(rsUsuario);
                DireccionPr direccionPr = new DireccionPr();
                this.setDirecciones(direccionPr.findAllDireccionUsuario(this.getId().toString()));

                RolPr rol = new RolPr();
                this.setRoles(rol.getRolesUsuario(this.getId().toString()));
            }
            c.desconectar();
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }
}
