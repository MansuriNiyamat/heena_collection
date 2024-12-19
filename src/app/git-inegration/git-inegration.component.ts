import { Component, inject } from '@angular/core';
import { GitIntegrationService } from '../services/git-integration.service';

@Component({
  selector: 'app-git-inegration',
  standalone: true,
  imports: [],
  templateUrl: './git-inegration.component.html',
  styleUrl: './git-inegration.component.css'
})
export class GitInegrationComponent {
git = inject(GitIntegrationService)

constructor(){
  this.git.getGrant().subscribe(res=>{
    console.log(res)
  }, err=>{
    console.log(err)
  })
}
}
