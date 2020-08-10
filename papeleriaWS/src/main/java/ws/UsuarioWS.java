/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws;

import data.Usuario;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import process.UsuarioPr;

/**
 * REST Web Service
 *

 */
@Path("UsuarioWS")
@RequestScoped
public class UsuarioWS {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of UsuarioWS
     */
    public UsuarioWS() {
    }

    /**
     * Retrieves representation of an instance of ws.UsuarioWS
     * @return an instance of java.lang.String
     */
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String create(Usuario usuario) {
        String id = "";
        try {
            UsuarioPr usuariosPr = new UsuarioPr();
            id = usuariosPr.create(usuario);
        } catch (Exception e) {
            Logger.getLogger("UsuarioWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return id;
        }
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public String edit(Usuario usuario) {
        String id = "";
        try {
            UsuarioPr usuariosPr = new UsuarioPr();
            id = usuariosPr.edit(usuario);
        } catch (Exception e) {
            Logger.getLogger("UsuarioWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return id;
        }
    }

    @DELETE
    @Path("{id}")
    public String remove(@PathParam("id") String idUsuario) {
        String id = "";
        try {
            UsuarioPr usuariosPr = new UsuarioPr();
            id = usuariosPr.remove(idUsuario);
        } catch (Exception e) {
            Logger.getLogger("UsuarioWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return id;
        }
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Usuario find(@PathParam("id") String id) throws SQLException {
        UsuarioPr usuariosPr = new UsuarioPr();
        try {
            usuariosPr.find(id);
        } catch (Exception e) {
            Logger.getLogger("UsuarioWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return usuariosPr;
        }
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Usuario> findAll() throws SQLException {
        UsuarioPr usuariosPr = new UsuarioPr();
        List<Usuario> lisUsuarios = new ArrayList<>();
        try {
            lisUsuarios = usuariosPr.findAll();
        } catch (Exception e) {
            Logger.getLogger("UsuarioWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return lisUsuarios;
        }
    }
    
    @GET
    @Path("login/{correo}/{password}")
    @Produces(MediaType.APPLICATION_JSON)
    public Usuario loginUsuario(@PathParam("correo") String correo, @PathParam("password") String password) throws SQLException {
        UsuarioPr usuariosPr = new UsuarioPr();
        try {
            usuariosPr.loginUsuario(correo, password);
        } catch (Exception e) {
            Logger.getLogger("UsuarioWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return usuariosPr;
        }
    }
}
