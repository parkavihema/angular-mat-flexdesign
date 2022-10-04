import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/constants';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  userForm !: FormGroup;
  userId = null;
  isAddMode: boolean = true;
  userData: User[] = []
  usersList = [];

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', Validators.required]
    })
    this.getAllUsers();
    console.log(this.isAddMode);
    this.route.params.subscribe(x => {
      if (x['id']) {
        console.log(x);
        this.isAddMode = false;
        this.userId = x['id'];
        this.patchFormVaue(this.userId);
      }
      else
        this.isAddMode = true;
    })


  }

  getAllUsers() {
    const url = 'https://dummy.restapiexample.com/api/v1/employees'
    this.userService.getAllEmployees(url).subscribe((res: any) => {
      console.log(res);
      this.usersList = res.data;
    })
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl; } {
    return this.userForm.controls;
  }

  public errorHandling = (control: string, error: string) => {
    return this.userForm.controls[control].hasError(error);
  }

  patchFormVaue(id: any) {
    const baseUrl = 'https://dummy.restapiexample.com/api/v1/employee';
    const url = `${baseUrl}/${id}`;
    this.userService.getEmployeeById(url).subscribe((res: any) => {
      console.log(res);
      this.userForm.patchValue({
        name: res.data.employee_name,
        salary: res.data.employee_salary,
        age: res.data.employee_age
      })
    })
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }
    let user = {
      id: this.isAddMode ? this.usersList.length + 1 : this.userId,
      employee_name: this.userForm.controls['name'].value,
      employee_salary: this.userForm.controls['salary'].value,
      employee_age: this.userForm.controls['age'].value,
      profile_image: ''
    }
    console.log(user);

    if (this.isAddMode) {
      const url = 'https://dummy.restapiexample.com/api/v1/create';
      this.userService.createEmployee(url, user).subscribe((res: any) => {
        console.log(res);
      })
      this.router.navigateByUrl(``);
    }
    else {
      const baseUrl = 'https://dummy.restapiexample.com/api/v1/update';
      const updateUrl = `${baseUrl}/${this.userId}`;
      this.userService.updateEmployee(updateUrl, user).subscribe((res: any) => {
        console.log(res);
      })
      this.router.navigateByUrl(``);
    }
    console.log(this.userForm.value);
  }


}
