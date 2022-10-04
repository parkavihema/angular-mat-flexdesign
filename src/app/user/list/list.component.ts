import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/constants';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  user: User[] = [];
  displayedColumns = ['name', 'salary', 'age', 'edit', 'delete'];
  dataSource = new MatTableDataSource<User>();
  constructor(private userService: UserService, public dialog: MatDialog, private router: Router,) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    const url = 'https://dummy.restapiexample.com/api/v1/employees'
    this.userService.getAllEmployees(url).subscribe((res: any) => {
      console.log(res);
      this.dataSource = res.data;
    })
  }
  updateUser(data: any) {
    this.router.navigateByUrl(`update/${data.id}`);
  }


  confirmAndDelete(event: any) {
    const confirmationDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      height: '40%',
      autoFocus: false,
      data: {
        header: 'Confirmation',
        title: `Are you sure you want to remove this user?`
      }
    });
    confirmationDialog.afterClosed().subscribe(result => {
      console.log(event);
      console.log(result);
      if (result) {
        this.deleteUser(event.id);
      }
    });
  }

  deleteUser(data: any) {
    const baseUrl = 'https://dummy.restapiexample.com/api/v1/delete';
    const url = `${baseUrl}/${data}`;
    this.userService.deleteEmployee(url).subscribe((res: any) => {
      console.log(res);
      this.getAllUsers();
    })
    console.log(data);
  }


}
