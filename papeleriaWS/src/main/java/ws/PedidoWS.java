/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws;

import data.Pedido;
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
import process.PedidoPr;

/**
 * REST Web Service
 *
 */
@Path("PedidoWS")
@RequestScoped
public class PedidoWS {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of PedidoWS
     */
    public PedidoWS() {
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public String create(Pedido pedido) {
        String id = "";
        try {
            PedidoPr pedidosPr = new PedidoPr();
            id = pedidosPr.create(pedido);
        } catch (Exception e) {
            Logger.getLogger("PedidoWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return id;
        }
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public String edit(Pedido usuario) {
        String id = "";
        try {
            PedidoPr pedidosPr = new PedidoPr();
            id = pedidosPr.edit(usuario);
        } catch (Exception e) {
            Logger.getLogger("PedidoWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return id;
        }
    }

    @DELETE
    @Path("{id}")
    public String remove(@PathParam("id") String idPedido) {
        String id = "";
        try {
            PedidoPr pedidosPr = new PedidoPr();
            id = pedidosPr.remove(idPedido);
        } catch (Exception e) {
            Logger.getLogger("PedidoWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return id;
        }
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Pedido find(@PathParam("id") String id) throws SQLException {
        PedidoPr pedidosPr = new PedidoPr();
        try {
            pedidosPr.find(id);
        } catch (Exception e) {
            Logger.getLogger("PedidoWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return pedidosPr;
        }
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Pedido> findAll() throws SQLException {
        PedidoPr pedidosPr = new PedidoPr();
        List<Pedido> lisPedidos = new ArrayList<>();
        try {
            lisPedidos = pedidosPr.findAll();
        } catch (Exception e) {
            Logger.getLogger("PedidoWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return lisPedidos;
        }
    }
    
    @GET
    @Path("cliente/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Pedido> findAllCliente(@PathParam("id") String idPedido) throws SQLException {
        PedidoPr pedidosPr = new PedidoPr();
        List<Pedido> lisPedidos = new ArrayList<>();
        try {
            lisPedidos = pedidosPr.findAllCliente(idPedido);
        } catch (Exception e) {
            Logger.getLogger("PedidoWS").log(Level.SEVERE, e.getMessage());
        } finally {
            return lisPedidos;
        }
    }
}
