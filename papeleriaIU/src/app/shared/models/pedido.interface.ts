import { UsuarioI } from './usuario.interface';
import { ArticuloI} from './articulo.interface';
export interface PedidoI {
  id?: string;
  usuario_id: string;
  descripcion?: string;
  estado: string;
  fecha: string;
  precio?: string;
  cliente?: UsuarioI;
  articulos?: Array<ArticuloI>;
}
