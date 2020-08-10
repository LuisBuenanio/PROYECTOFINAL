/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package process;

import data.Rol;
import data.Conexion;
import data.Rol;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class RolPr {

    List<Rol> getRolesUsuario(String idUsuario) throws SQLException {
        Conexion c = new Conexion();
        String sql;
        List<Rol> lisRoles = new ArrayList<>();
        if (c.conectar() != null) {
            sql = "SELECT r.* FROM roles r INNER JOIN usuario_rol ur ON r.id = ur.rol_id\n"
                    + "	WHERE usuario_id = '" + idUsuario + "' ORDER BY r.id;";

            ResultSet rsRol = c.execSQL(sql);
            while (rsRol.next()) {
                Rol rol = new Rol();

                this.setThis(rsRol, rol);

                lisRoles.add(rol);
            }
            c.desconectar();
            return lisRoles;
        } else {
            c.desconectar();
            throw new Error("Error de conexión.");
        }
    }

    private void setThis(ResultSet rsRol, Rol rol) throws SQLException {
        rol.setId(rsRol.getInt("id"));
        rol.setNombre(rsRol.getString("nombre"));
        rol.setDescripcion(rsRol.getString("descripcion"));
    }

}
