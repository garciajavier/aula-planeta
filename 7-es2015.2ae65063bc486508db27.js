(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"vm+o":function(t,e,n){"use strict";n.r(e),n.d(e,"LoginModule",(function(){return B}));var o=n("nIj0"),r=n("2kYt"),i=n("sEIs"),a=n("J+dc"),c=n("kuMc"),s=n("ZTXN"),l=n("mQTi"),b=n("EM62"),m=n("W1gw"),u=n("HYj3"),d=n("Meci"),g=n("29Wa"),h=n("Cd2c"),p=n("R7+U"),f=n("PBFl"),C=n("mFH5");function S(t,e){if(1&t&&(b.Tb(0,"mat-option",17),b.Cc(1),b.Sb()),2&t){const t=e.$implicit;b.kc("value",t),b.Bb(1),b.Dc(t.description)}}let O=(()=>{class t{constructor(t,e,n,o,r){this.formBuilder=t,this.router=e,this.snackBar=n,this.overlayContainer=o,this.authManagementService=r,this.destroy$=new s.a,this.loading=!1,this.submitted=!1,this.overlayContainer.getContainerElement().classList.add("login-theme"),this.authManagementService.currentUser&&this.router.navigate(["/"])}ngOnInit(){this.registerForm=this.formBuilder.group({firstName:["",o.p.required],lastName:["",o.p.required],email:["",o.p.required,o.p.email],roles:["",o.p.required],password:["",[o.p.required,o.p.minLength(4)]]})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}onSubmit(){this.submitted=!0,this.registerForm.invalid||(this.loading=!0,this.authManagementService.register(this.registerForm.value).pipe(Object(a.a)(1),Object(c.a)(this.destroy$)).subscribe(()=>{this.snackBar.open("Registro completado","OK",{duration:2e3}),this.router.navigate(["/"])}))}}return t.\u0275fac=function(e){return new(e||t)(b.Nb(o.d),b.Nb(i.g),b.Nb(m.a),b.Nb(u.e),b.Nb(l.a))},t.\u0275cmp=b.Hb({type:t,selectors:[["app-register"]],decls:42,vars:5,consts:[[1,"login-theme","d-flex","flex-row","justify-content-center","align-items-center"],["role","form",3,"formGroup","ngSubmit"],[1,"d-flex","flex-column"],[1,"w-100"],["aria-label","Nombre"],["matInput","","name","firstName","type","text","formControlName","firstName"],["aria-label","Apellido"],["matInput","","name","lastName","type","text","formControlName","lastName"],["aria-label","Email"],["matInput","","name","email","type","text","formControlName","email"],["aria-label","Contrase\xf1a"],["matInput","","name","password","type","text","formControlName","password"],["aria-label","Roles"],["formControlName","roles","multiple","","panelClass","cdkSelect"],[3,"value",4,"ngFor","ngForOf"],["role","button","type","submit","mat-raised-button","","color","primary",1,"w-100",3,"disabled","click"],["role","button","mat-raised-button","","color","accent","routerLink","/login",1,"w-100"],[3,"value"]],template:function(t,e){1&t&&(b.Tb(0,"div",0),b.Tb(1,"mat-card"),b.Tb(2,"mat-card-title-group"),b.Tb(3,"mat-card-title"),b.Cc(4,"Crea a tu usuario"),b.Sb(),b.Sb(),b.Tb(5,"mat-card-content"),b.Tb(6,"form",1),b.ac("ngSubmit",(function(){return e.onSubmit()})),b.Tb(7,"fieldset",2),b.Tb(8,"mat-form-field",3),b.Tb(9,"mat-label",4),b.Cc(10,"Nombre"),b.Sb(),b.Ob(11,"input",5),b.Tb(12,"mat-error"),b.Cc(13,"Campo requerido"),b.Sb(),b.Sb(),b.Tb(14,"mat-form-field",3),b.Tb(15,"mat-label",6),b.Cc(16,"Apellido"),b.Sb(),b.Ob(17,"input",7),b.Tb(18,"mat-error"),b.Cc(19,"Campo requerido"),b.Sb(),b.Sb(),b.Tb(20,"mat-form-field",3),b.Tb(21,"mat-label",8),b.Cc(22,"email"),b.Sb(),b.Ob(23,"input",9),b.Tb(24,"mat-error"),b.Cc(25,"Campo requerido"),b.Sb(),b.Sb(),b.Tb(26,"mat-form-field",3),b.Tb(27,"mat-label",10),b.Cc(28,"Contrase\xf1a"),b.Sb(),b.Ob(29,"input",11),b.Tb(30,"mat-error"),b.Cc(31,"Campo requerido"),b.Sb(),b.Sb(),b.Tb(32,"mat-form-field",3),b.Tb(33,"mat-label",12),b.Cc(34,"Roles"),b.Sb(),b.Tb(35,"mat-select",13),b.Bc(36,S,2,2,"mat-option",14),b.fc(37,"async"),b.Sb(),b.Sb(),b.Tb(38,"button",15),b.ac("click",(function(){return e.onSubmit()})),b.Cc(39,"Crear"),b.Sb(),b.Tb(40,"button",16),b.Cc(41,"Iniciar Sesi\xf3n"),b.Sb(),b.Sb(),b.Sb(),b.Sb(),b.Sb(),b.Sb()),2&t&&(b.Bb(6),b.kc("formGroup",e.registerForm),b.Bb(30),b.kc("ngForOf",b.gc(37,3,e.authManagementService.roles$)),b.Bb(2),b.kc("disabled",e.registerForm.invalid))},directives:[d.a,d.i,d.h,d.d,o.q,o.l,o.f,g.c,g.f,h.b,o.c,o.k,o.e,g.b,p.a,r.j,f.a,i.h,C.o],pipes:[r.b],styles:[".login-theme[_ngcontent-%COMP%]{width:100vw;height:100vh}.login-theme[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{width:24.375em}.login-theme[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{margin:.75em 0}.login-theme[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-align:right;cursor:pointer}.login-theme[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}"]}),t})();var T=n("eQuC"),v=n("pHcU"),y=n("Pq5H"),w=n("bFHC");const M=function(){return["fab","microsoft"]},k=function(){return["fab","google"]},P=[{path:"",component:(()=>{class t{constructor(t,e,n,o,r){this.formBuilder=t,this.route=e,this.router=n,this.authenticationService=o,this.authService=r,this.destroy$=new s.a,this.submitted=!1,this.authenticationService.currentUser&&this.router.navigate(["/"])}ngOnInit(){this.loginForm=this.formBuilder.group({email:["",o.p.required],password:["",o.p.required]}),this.returnUrl=this.route.snapshot.queryParams.returnUrl||"/"}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}get f(){return this.loginForm.controls}onSubmit(){this.submitted=!0,this.loginForm.invalid||(console.log("NetworkConnection.status: login.comp: ",v.a.status),v.a.isOnline().then(t=>{t?this.authenticationService.authLogin(this.f.email.value,this.f.password.value).pipe(Object(a.a)(1),Object(c.a)(this.destroy$)).subscribe(()=>{this.router.navigateByUrl("/")},t=>{alert(JSON.stringify(t))}):this.authenticationService.authLoginOffline().pipe(Object(a.a)(1),Object(c.a)(this.destroy$)).subscribe(()=>{setTimeout(()=>{this.router.navigateByUrl("/")},1e3)},t=>{alert(JSON.stringify(t))})}))}socialLogin(t){switch(console.log("NetworkConnection.status: socialLogin: ",v.a.status),t){case"google":if(!navigator.onLine)throw{statusText:"No est\xe1s conectado a internet"};this.authService.signIn(T.a.PROVIDER_ID).then(t=>{this.authenticationService.authLoginGoogle(t.idToken).pipe(Object(a.a)(1),Object(c.a)(this.destroy$)).subscribe(()=>{this.router.navigateByUrl("/")})});break;case"microsoft":if(!navigator.onLine)throw{statusText:"No est\xe1s conectado a internet"};this.authService.signIn(T.b.PROVIDER_ID);break;default:this.onSubmit()}}register(){this.router.navigateByUrl("/login/register")}}return t.\u0275fac=function(e){return new(e||t)(b.Nb(o.d),b.Nb(i.a),b.Nb(i.g),b.Nb(l.a),b.Nb(T.c))},t.\u0275cmp=b.Hb({type:t,selectors:[["ng-component"]],decls:35,vars:6,consts:[[1,"login-theme","d-flex","flex-row","justify-content-center","align-items-center"],["role","form",1,"d-flex","flex-column",3,"formGroup"],[1,"d-flex","flex-column"],[1,"w-100"],["matInput","","name","email","type","text","formControlName","email"],["matInput","","name","password","type","password","formControlName","password"],["role","button","type","submit","mat-raised-button","","color","primary",1,"w-100",3,"disabled","click"],["href","#",1,"text-center"],["type","button","role","button","mat-raised-button","","color","accent",1,"w-100",3,"click"],["type","button","role","button","mat-raised-button","",3,"click"],[3,"icon"],["role","button","mat-raised-button","",3,"click"],["role","button","aria-label","Alumno","mat-mini-fab","","color","primary"]],template:function(t,e){1&t&&(b.Tb(0,"div",0),b.Tb(1,"mat-card"),b.Tb(2,"mat-card-title-group"),b.Tb(3,"mat-card-title"),b.Cc(4,"Ingresa a aulaPlaneta"),b.Sb(),b.Sb(),b.Tb(5,"mat-card-content"),b.Tb(6,"form",1),b.Tb(7,"fieldset",2),b.Tb(8,"mat-form-field",3),b.Tb(9,"mat-label"),b.Cc(10,"Usuario"),b.Sb(),b.Ob(11,"input",4),b.Tb(12,"mat-error"),b.Cc(13,"Campo requerido"),b.Sb(),b.Sb(),b.Tb(14,"mat-form-field",3),b.Tb(15,"mat-label"),b.Cc(16,"Contrase\xf1a"),b.Sb(),b.Ob(17,"input",5),b.Tb(18,"mat-error"),b.Cc(19,"Campo requerido"),b.Sb(),b.Sb(),b.Tb(20,"button",6),b.ac("click",(function(){return e.onSubmit()})),b.Cc(21,"Entrar"),b.Sb(),b.Sb(),b.Tb(22,"a",7),b.Cc(23,"\xbfHas olvidado tu contrase\xf1a?"),b.Sb(),b.Tb(24,"button",8),b.ac("click",(function(){return e.register()})),b.Cc(25,"Crear cuenta"),b.Sb(),b.Tb(26,"button",9),b.ac("click",(function(){return e.socialLogin("microsoft")})),b.Ob(27,"fa-icon",10),b.Cc(28," Entrar con Office365 "),b.Sb(),b.Tb(29,"button",11),b.ac("click",(function(){return e.socialLogin("google")})),b.Ob(30,"fa-icon",10),b.Cc(31," Entrar con Google "),b.Sb(),b.Sb(),b.Sb(),b.Sb(),b.Tb(32,"button",12),b.Tb(33,"mat-icon"),b.Cc(34,"school"),b.Sb(),b.Sb(),b.Sb()),2&t&&(b.Bb(6),b.kc("formGroup",e.loginForm),b.Bb(14),b.kc("disabled",e.loginForm.invalid),b.Bb(7),b.kc("icon",b.lc(4,M)),b.Bb(3),b.kc("icon",b.lc(5,k)))},directives:[d.a,d.i,d.h,d.d,o.q,o.l,o.f,g.c,g.f,h.b,o.c,o.k,o.e,g.b,f.a,y.a,w.a],styles:[".login-theme[_ngcontent-%COMP%]{width:100vw;height:100vh}.login-theme[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{width:24.375em}.login-theme[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{margin:.75em 0}.login-theme[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-align:right;cursor:pointer}.login-theme[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.login-theme[_ngcontent-%COMP%]   .mat-mini-fab[_ngcontent-%COMP%]{position:fixed;top:2em;right:2em}"]}),t})()},{path:"register",component:O}];let N=(()=>{class t{}return t.\u0275mod=b.Lb({type:t}),t.\u0275inj=b.Kb({factory:function(e){return new(e||t)},imports:[[i.k.forChild(P)],i.k]}),t})();var _=n("hctd"),x=n("W8IG");let B=(()=>{class t{constructor(t){t.addIcons(x.e,x.b)}}return t.\u0275mod=b.Lb({type:t}),t.\u0275inj=b.Kb({factory:function(e){return new(e||t)(b.Xb(y.b))},imports:[[r.c,N,o.o,_.a,y.c],y.c]}),t})()}}]);