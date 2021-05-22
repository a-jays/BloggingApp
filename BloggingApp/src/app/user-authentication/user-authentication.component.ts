import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { title } from 'process';
import { AuthService } from '../auth.service';
import { UsersBlogList } from '../users-blog-list';

@Component({
  selector: 'app-user-authentication',
  templateUrl: './user-authentication.component.html',
  styleUrls: ['./user-authentication.component.css']
})
export class UserAuthenticationComponent implements OnInit {
  edit: boolean = false;
  blogForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    content: new FormControl('')
  });
  isAddNew: boolean = false;
  SortAscending: boolean = false;
  SortDescending: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }
  Name = 'Ajay';
  BlogList: UsersBlogList[] = [
    {id : 1,title : 'My First Blog',content : 'How you doingg?? :)',createdDate: new Date()},
    {id : 2,title : 'Enviroment',content : 'What Environment????? we are superior we should burn all the resources :|   (by the way it is a stire)', createdDate: new Date("2021-05-23")}
  ];
  blog: UsersBlogList;
  content: string;
  ngOnInit() {
    this.edit = false;
    this.isAddNew = false;
    this.blog = {} as UsersBlogList;
  }
  onSelect(blog: UsersBlogList) {
    this.blog = blog;
    this.edit = false;
    this.isAddNew = false;
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  onEdit(blog: UsersBlogList){
    this.edit = true;
    this.isAddNew = false;
    this.blog = blog;
  }
  onSave() {
    if(this.content != ''){
      this.blog.content = this.content;
      this.content = '';
      this.ngOnInit();
    }
  }
  onDelete(blog: UsersBlogList) {
    const index = this.BlogList.indexOf(blog,0);
    if (index > -1) {
      this.BlogList.splice(index, 1);
    }

    this.ngOnInit();
  }
  addNew() {
    this.ngOnInit();
    this.isAddNew = true;
  }
  onNewSave() {
    this.blog.id = this.BlogList[this.BlogList.length-1].id + 1;
    this.blog.title = this.blogForm.value.title;
    this.blog.content = this.blogForm.value.content;
    this.blog.createdDate = new Date();
    this.BlogList.push(this.blog);
    this.ngOnInit();
  }
  sortAscending() {
    this.SortAscending =true;
    this.BlogList.sort((a,b) => {
      return <any>new Date(a.createdDate) - <any>new Date(b.createdDate);
    });
    this.SortDescending = false;
  }
  sortDescending() {
    this.SortDescending = true;
    this.BlogList.sort((a,b) => {
      return <any>new Date(b.createdDate) - <any>new Date(a.createdDate);
    });
    this.SortAscending =false;
  }
}
