/**
 *  @package        App.components.home.ts
 *  
 *  @author         Jesús David Pérez. <jdperez@guayanadev.com>.
 *  @copyright      Todos los derechos reservados. GuayanaDev. 2019.
 *  
 *  @since          Versión 1.0, revisión 29-10-2019.
 *  @version        1.0
 * 
 *  @final  
 */
import { Component, OnInit } from '@angular/core';
import { BreedsListAllService } from 'src/app/services/breeds-list-all.service';
import { BreedsImgRamdonService } from 'src/app/services/breeds-img-ramdon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  public breedsArray: Array<any> = [];

  constructor(
    private BreedsList: BreedsListAllService,
    private BreedsImg: BreedsImgRamdonService
  ) { }

  ngOnInit() {
    this.breedsAll();
  }

  /* Función que obtiene todas las razas de perros */
  breedsAll () {
    this.BreedsList.getBreedsAll().subscribe((response: any) => {
      console.log(response);
      
      let array = Object.keys(response.message)
      console.log(array)
      // Recorremos el array de razas de perros
      array.forEach( item => {

        // Si la raza posee subrazas
        if (response.message[item].length > 0) {
          let subBreeds = response.message[item]
          /* Recorremos todas las subrazas */
          subBreeds.forEach( data => {
            let subBreedName = item+'/'+data;
            /* Obtenemos la imagen de cada subraza de perro (1 img ramdon) */
            this.BreedsImg.getBreed(subBreedName).subscribe((response: any) => {
              this.breedsArray.push({ name: item+' '+data, img: response.message })
            });  
          });

        } else {
          // Solo razas
          /* Obtenemos la imagen de cada raza de perro (1 img ramdon) */
          this.BreedsImg.getBreed(item).subscribe((response: any) => {
            // console.log(response);
            this.breedsArray.push({ name: item, img: response.message })
          });  
        } 

      });

      console.log(this.breedsArray)
    },
    error => {
      console.log(error)
    });
  }

}
