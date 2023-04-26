import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Noticia } from '../interfases/noticia';

@Injectable({
  providedIn: 'root'
})
export class NewSvcService {

  private noticiasCollection?: AngularFirestoreCollection<Noticia>;

  constructor(private readonly nicoll: AngularFirestore) { }
  public getNews(): Observable<Noticia[]>{
         
    this.noticiasCollection = this.nicoll.collection<Noticia>('noticias', p=> p.orderBy('order','asc'));
 
    return this.noticiasCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Noticia;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }


}
