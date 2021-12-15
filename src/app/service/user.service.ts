import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../shared/model/profile.model';
import { UserData, UserInfo } from '../shared/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient) {}

  // Follow the user
  followUser(username: string) {
    return this.http.post<UserProfile>(
      `${this.API_URL}/profiles/${username}/follow`,
      {}
    );
  }

  // UnFollow the user
  unFollowUser(username: string) {
    return this.http.delete<UserProfile>(
      `${this.API_URL}/profiles/${username}/follow`
    );
  }

  // Get the user
  getUser() {
    return this.http.get<UserData>(`${this.API_URL}/user`);
  }

  // Update the user
  editUser(user: { user: UserInfo }) {
    return this.http.put<UserData>(`${this.API_URL}/user`, user);
  }

  // Get the user profile
  getUserProfile(username: string) {
    return this.http.get<UserProfile>(`${this.API_URL}/profiles/${username}`);
  }
}
