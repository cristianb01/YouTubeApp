import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey     = 'AIzaSyCtfVWP2UFf-iYd8EbQADtuv9zeiazgWeI';
  private playListId = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken   = '';


  constructor( private httpClient: HttpClient ) { }

  getVideos() {
    const url = `${ this.youtubeUrl }/playlistItems`
    const params = new HttpParams()
                    .set('part','snippet')
                    .set('maxResults','12')
                    .set('playlistId', this.playListId)
                    .set('key',this.apiKey)  
                    .set('pageToken', this.nextPageToken)

    return this.httpClient.get<YoutubeResponse>( url, { params: params })
          .pipe(
            map( resp => {
              this.nextPageToken = resp.nextPageToken;
              return resp.items;
            }),

            map( items => {
              return items.map( video => video.snippet )
            })
          );
  }
}
