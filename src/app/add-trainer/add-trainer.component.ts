import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddTrainerService } from './add-trainer.service';
declare var $: any;

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.scss']
})
export class AddTrainerComponent implements OnInit {

  isLoading =false;

  constructor(private addTrainerService: AddTrainerService) { }

  errorMassage = "";

  ngOnInit(): void {
  }

  onAddTrainer(form: NgForm) {
    if(form.value.password != form.value.confirmPassword){
      this.errorMassage = "passwords must match!"
      $('#errorModal').modal('show');
      return;
    }
    this.isLoading = true;

    this.addTrainerService.addUser(form.value.newTrainerEmail, form.value.password)
      .subscribe(response => {
        this.isLoading = false;
        form.reset();
        $('#trainerAddSucssModal').modal('show');
    }, error => {
      console.log(error);
      this.getErrorMasage(error);
      this.isLoading = false;
      $('#errorModal').modal('show');
    })

  }

  private getErrorMasage(error) {
    try{
      this.errorMassage = error.error.modelState["model.Password"][0];
    } catch(err) {
      try{
        this.errorMassage = error.error.modelState[""][0];
      } catch(err) {
        console.log(err);
      }
    }
  }

}
