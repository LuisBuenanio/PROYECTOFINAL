/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws;

import data.Articulo;
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
import process.ArticuloPr;

/**
 * REST Web Service
 *
 * 
 */
@Path("ArticuloWS")
@RequestScoped
public class ArticuloWS {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of ArticuloWS
     */
    public ArticuloWS() {
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String create(Articulo articulo) {
        String id = "";
        try {
            ArticuloPr articulosPr = new ArticuloPr();
            id = articulosPr.create(articulo);
        } catch (Exception e) {
            Logger.getLogger("ArticuloWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return id;
        }
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public String edit(Articulo usuario) {
        String id = "";
        try {
            ArticuloPr articulosPr = new ArticuloPr();
            id = articulosPr.edit(usuario);
        } catch (Exception e) {
            Logger.getLogger("ArticuloWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return id;
        }
    }

    @DELETE
    @Path("{id}")
    public String remove(@PathParam("id") String idArticulo) {
        String id = "";
        try {
            ArticuloPr articulosPr = new ArticuloPr();
            id = articulosPr.remove(idArticulo);
        } catch (Exception e) {
            Logger.getLogger("ArticuloWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return id;
        }
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Articulo find(@PathParam("id") String id) throws SQLException {
        ArticuloPr articulosPr = new ArticuloPr();
        try {
            articulosPr.find(id);
        } catch (Exception e) {
            Logger.getLogger("ArticuloWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return articulosPr;
        }
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Articulo> findAll() throws SQLException {
        ArticuloPr articulosPr = new ArticuloPr();
        List<Articulo> lisArticulos = new ArrayList<>();
        try {
            lisArticulos = articulosPr.findAll();
        } catch (Exception e) {
            Logger.getLogger("ArticuloWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return lisArticulos;
        }
    }
}
