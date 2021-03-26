import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Fighter } from 'src/app/core/models/fighter.model';

@Injectable({
  providedIn: 'root'
})
export class FighterService {

  public fighters: Fighter[] = [];

  constructor(private db: AngularFirestore) { 
  }

  public getFighters(): Observable<Fighter[]>{
    return this.db.collection<Fighter>('fighters', (ref)=> ref.orderBy('name')).valueChanges({idField: 'id'})
  }

  public createFighter(fighter: Fighter): Promise<DocumentReference<Fighter>> {
    return this.db.collection<Fighter>('fighters').add(fighter);
  }

  public updateFighter(id: string, fighter: Fighter): Promise<void>{
    return this.db.collection<Fighter>('fighters').doc(id).update(fighter);
  }

  public deleteFighter(id: string): Promise<void>{
    return this.db.collection<Fighter>('fighters').doc(id).delete();
  }
}
