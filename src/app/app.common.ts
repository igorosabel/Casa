/*
 * Servicios
 */
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { UserService } from 'src/app/services/user.service';

export const SERVICES: any[] = [
  ApiService,
  DataShareService,
  UserService,
  ClassMapperService,
  AuthService,
];
