/*
 * Páginas
 */
export const PAGES: any[] = [

];

/*
 * Componentes parciales
 */
export const COMPONENTS: any[] = [
 
 ];
 
 /*
 * Pipes
 */
export const PIPES: any[] = [];

/*
 * Servicios
 */
import { ApiService }         from './services/api.service';
import { DataShareService }   from './services/data-share.service';
import { UserService }        from './services/user.service';
import { ClassMapperService } from './services/class-mapper.service';
import { AuthService }        from './services/auth.service';

export const SERVICES: any[] = [
	ApiService,
	DataShareService,
	UserService,
	ClassMapperService,
	AuthService
];
