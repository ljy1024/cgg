<template>
	<div class="User">
		<div class="btns">
			<el-button size='small' @click='toAdduser'>新增</el-button>
		</div>
		<div class="article_tbl" v-loading='loading'>
			<el-table border size='mini' :data="users" style="width: 100%"
			@selection-change="handleSelectionChange">
		      <el-table-column
		        prop="username"
		        label="用户名"
		        width="120">
		      </el-table-column>
		      <el-table-column
		        prop="nickname"
		        label="真实姓名">
		      </el-table-column>
		      <el-table-column
		        prop="email"
		        label="邮箱">
		      </el-table-column>
		      <el-table-column
		        prop="enabled"
		        label="是否在线">
		      </el-table-column>
		      <el-table-column
		        label="操作" width="100px">
		        <template slot-scope='{row}'>
		        	<i class="fa fa-trash" title="删除"  @click='deleteUser(row.id)'></i>
		        	<i class="fa fa-pencil" title="修改"  @click='toUpdateUser(row)'></i>
		        </template>
		      </el-table-column>
		    </el-table>
		</div>
		<!-- 模态框开始 -->
		<el-dialog :title="cDialog.title" :visible.sync="cDialog.visible" size='small'>
			<!-- {{cDialog.form}} -->
		  <el-form ref='userForm' :model="cDialog.form" label-position="left" :rules='rules'>
		    <el-form-item label="用户名" label-width="6em" prop='username'>
		      <el-input v-model="cDialog.form.username" autocomplete="off" placeholder="请输入用户名"></el-input>
		    </el-form-item>
		    <el-form-item label="真实姓名" label-width="6em" prop='nickname'>
		      <el-input v-model="cDialog.form.nickname" autocomplete="off" placeholder="请输入真实姓名"></el-input>
		    </el-form-item>
		    <el-form-item label="邮箱" label-width="6em" prop='email'>
		      <el-input v-model="cDialog.form.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click='closeCdialog()'>取 消</el-button>
		    <el-button type='primary' @click='saveOrUpdateCategory()'>确 定</el-button>
		  </div>
		</el-dialog>
		<!-- 模态框结束 -->
	</div>
</template>
<script>
	import axios from '@/http/axios'
	export default{
		data(){
			return{
				rules:{
					username:[{
						required:true,
						message:'请输入用户名',
						trigger:'blur'
					}],
					nickname:[{
						required:true,
						message:'请输入真实姓名',
						trigger:'blur'
					}],
					email:[{
						required:true,
						message:'请输入邮箱',
						trigger:'blur'
					}]
				},
				users:[],
				loading:false,
				multipleSelection:[],
				cDialog:{
					title:'',
					visible:false,
					form:{

					}
				}
			}
		},
		created(){
			this.findAllUser();
		},
		methods:{
			saveOrUpdateCategory(){
				this.$refs.userForm.validate((valid)=>{
					if (valid) {
						axios.post('/manager/user/saveOrUpdateUser',this.cDialog.form)
						.then(()=>{this.$notify({
					          title: '成功',
					          message: '提交成功',
					          type: 'success'
					        });
							 this.closeCdialog();
							 this.findAllUser();
						})
						.catch(()=>{
							this.$notify.error({
					          title: '错误',
					          message: '提交失败'
					        });
						})
					}
				})
				
			},
			closeCdialog(){
				this.cDialog.visible=false;
				this.cDialog.form={}
			},
			toAdduser(){
				this.cDialog.visible=true;
				this.cDialog.title='添加用户';
			},
			toUpdateUser(){

			},
			deleteUser(id){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        })
		        .then(()=>{
		        	axios.get('/manager/user/deleteUserById?id='+id)
					.then(()=>{
						// Notification通知
						this.$notify.success({
				          title: '成功',
				          message: '删除成功'
				        });
				        this.findAllUser()
					})
					.catch(()=>{
						// Notification通知
						this.$notify.error({
				          title: '失败',
				          message: '删除失败'
				        });
					})
		        })
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			findAllUser(){
				this.loading=true;
				axios.get('/manager/user/findAllUser')
				.then(({data:result})=>{
					this.users=result.data;
				})
				.catch(()=>{
					// Notification通知
					this.$notify.error({
			          title: '错误',
			          message: '加载异常'
			        });
				})
				.finally(()=>{
					this.loading=false;
				})
			}
		}
	}
</script>
<style>
	.btns{
		margin-bottom:  .5em;
	}
	.btns button{
		margin-right:-5px
	}
	i.fa{
		font-size: 18px;
		cursor: pointer;
	}
	.fa-trash{
		color:#F56C6C;
		margin-right: 20px;
	}
	.fa-pencil{
		color: #67C23A;
	}
</style>