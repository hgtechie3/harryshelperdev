import { Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { TalkService } from './services/talk.service'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ TalkService ]
})
export class AppComponent {

  title = 'app';
  searchTerm = '';
  gotResults: boolean = false;
  helpfulWordsArr: object = [];
  modalRef: BsModalRef;
  isModalShown: boolean = false;
  infoMessage: string = '';

  constructor(private talkService: TalkService, private modalService: BsModalService){
  }

  searchTermSetter(search){  	
  }
  validateStr(str){
  	return str.replace(/[^a-zA-Z]/gi, '');
  }
  showInfoModal(){
  	this.isModalShown = true;
  }
  hideInfoModal(){
  	this.isModalShown = false;
  }
  sendSearcher(){
		
	this.infoMessage = '';
  	let searchString = this.searchTerm.trim()
  	this.talkService.wassup({searchTerm: searchString}).subscribe( (subRes: any) => {
		
  		if(subRes.success && subRes.data){

  			if(subRes.data.length > 0){
  				this.infoMessage = '';
				this.helpfulWordsArr = subRes.data;
	  			this.gotResults = true;	
				var target = document.getElementById("helpShowerDiv"); 
				if(target){
					animate(document.scrollingElement || document.documentElement, "scrollTop", "", 0, target.offsetTop, 1000, true);
				}				  	
  			}
  			else{
  				var target = document.getElementById("navbar-full"); 
  				if(target){
  					animate(document.scrollingElement || document.documentElement, "scrollTop", "", 0, target.offsetTop, 1000, true);  		
  				}
				
  				this.infoMessage = 'No Valid Combinations in the Dictionary! Please Try Another Combination of Words!';
  				this.showInfoModal();
  			}  					
  		}
  		else{
  			var target = document.getElementById("navbar-full"); 
  			if(target){
  				animate(document.scrollingElement || document.documentElement, "scrollTop", "", 0, target.offsetTop, 1000, true); 	
  			}		
  			this.gotResults = false;
  			this.helpfulWordsArr = [];
  			this.infoMessage = subRes.message;  				
			this.showInfoModal();
  		}
  	},
  	(err) => {
  		var target = document.getElementById("navbar-full"); 
  		if(target){
  			animate(document.scrollingElement || document.documentElement, "scrollTop", "", 0, target.offsetTop, 1000, true);
		}
		 
  		this.infoMessage = 'The server seems to be down! Let Classic Man Know! Try Again Soon!';  				
		this.showInfoModal();
  		console.log('sub err')
  		console.log(err)
  	} );
  }

}

function animate(elem, style, unit, from, to, time, prop) {
	
    if (!elem) {
        return;
    }
    var start = new Date().getTime(),
        timer = setInterval(function () {
            var step = Math.min(1, (new Date().getTime() - start) / time);
            if (prop) {
                elem[style] = (from + step * (to - from))+unit;
            } else {
                elem.style[style] = (from + step * (to - from))+unit;
            }
            if (step === 1) {
                clearInterval(timer);
            }
        }, 25);
    if (prop) {
    	  elem[style] = from+unit;
    } else {
    	  elem.style[style] = from+unit;
    }
}