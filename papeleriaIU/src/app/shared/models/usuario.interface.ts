import { DireccionI } from './direccion.interface'
import { RolI } from './rol.interface'
export interface UsuarioI {
  id?: string;
  cedula?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  direccion?: string;
  correo: string;
  password?: string;
  direcciones?: Array<DireccionI>;
  roles?: Array<RolI>;
}
