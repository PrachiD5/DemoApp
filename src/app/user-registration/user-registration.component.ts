import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss'
})
export class UserRegistrationComponent {
  constructor(private userSer:UserServiceService, private rou:Router, private dialog:MatDialog ){}
  state: any[] = [];
  country: any[] = [];
  address: any[] = [];

  selectedAddressType: string = '';

  ngOnInit(): void {
      this.addData;

      this.userSer.getStates().subscribe(
        (data: any[]) => {
          this.state = data;
          console.log('States:', this.state);
        },
        (error) => console.error('Error fetching locations:', error)
      );

      this.userSer.getCountries().subscribe(
        (data: any[]) => {
          this.country = data;
          console.log('Countries:', this.country);
        },
        (error) => console.error('Error fetching locations:', error)
      );

      this.userSer.getAddress().subscribe(
        (data: any[]) => {
          this.address = data;
          console.log('Address:', this.address);
        },
        (error) => console.error('Error fetching locations:', error)
      );
  }
  
    addData=new FormGroup({
      image: new FormControl(null,[Validators.required]) ,
      fname:new FormControl('',[Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z]+$")]),
      lname:new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z]+$")]),
      email:new FormControl('',[Validators.required, Validators.email]),
      contact:new FormControl('',[Validators.required, Validators.pattern("[- +()0-9]+")]),
      age:new FormControl('',[Validators.required]),
      state:new FormControl('',[Validators.required]),
      country:new FormControl('',[Validators.required]),
      address: new FormGroup({
        type: new FormControl('', [Validators.required]),
        home: new FormGroup({
          home1: new FormControl('', [Validators.required]),
          home2: new FormControl('', [Validators.required]),
        }),
        company: new FormGroup({
          company1: new FormControl('', [Validators.required]),
          company2: new FormControl('', [Validators.required]),
        }),
      })      
  })
    onAdd()
    {
      this.userSer.addUsers(this.addData.value).subscribe((infos)=>{
        alert("New User Added Successfully!!");
        console.log(infos);
        this.rou.navigate(['/'])
      })
    }
    
    get formValues(){
      return this.addData.controls;
    }

    onSubmit(){
      this.rou.navigate(['/pro']);
      }

  urlLink:string='/assets/Image/profile.jpg';
  selectFiles(event:any){
    if(event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event:any)=>{
        this.urlLink = event.targer.result
      }
    }
  }


  selectedFile!: ImageSnippet;

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.userSer.uploadImage(this.selectedFile.file).subscribe(
        (res:any) => {
          this.onSuccess();
        },
        (err:any) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }
}
