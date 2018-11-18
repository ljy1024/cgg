<template>
	<div class="category">
		<!-- 按钮区 -->
		<div class="btns">
			<el-button size='small' @click='toAddCategory()'>新增</el-button>
			<el-button size='small' @click='batchDeleteCategory()'>批量删除</el-button>
		</div>
		<!-- 按钮区结束 -->
		<!-- 栏目管理表格 -->
		<div class="category_tbl" v-loading='loading'>
			<el-table border size='small' :data="categories" style="width: 100%" 
			@selection-change="handleSelectionChange">
				<el-table-column
			      type="selection"
			      width="35">
			    </el-table-column>
			    <el-table-column
		        prop="id"
		        label="编号"
		        width="60">
		      </el-table-column>
		      <el-table-column
		        prop="name"
		        label="栏目名称"
		        width="120">
		      </el-table-column>
		      <el-table-column
		        prop="parent.name"
		        label="父栏目"
		        width="120">
		      </el-table-column>
		      <el-table-column
		        prop="comment"
		        label="描述">
		      </el-table-column>
		      <el-table-column
		        label="操作" width="100px">
		        <template slot-scope='{row}'>
		        	<i class="fa fa-trash" title="删除" @click='deleteCategory(row.id)'></i>
		        	<i class="fa fa-pencil" title="修改" @click='toUpdateCategory(row)'></i>
		        </template>
		      </el-table-column>
		    </el-table>
		</div>
		<!-- 栏目管理表格结束 -->
		<!-- 模态框开始 -->
		<el-dialog :title="cDialog.title" :visible.sync="cDialog.visible" size='small'>
			<!-- {{cDialog.form}} -->
		  <el-form :model="cDialog.form" label-position="left"ref='categoryForm' :rules='rules'>
		  	<!-- prop和V-model的值必须保持一致 -->
		    <el-form-item prop='name' label="栏目名称" label-width="6em" >
		      <el-input v-model="cDialog.form.name" autocomplete="off" placeholder="请输入栏目名称"></el-input>
		    </el-form-item>
		    <el-form-item  prop='parentId'label="父栏目" label-width="6em">
		      <el-select v-model="cDialog.form.parentId" placeholder="请选择">
		        <el-option :key='c.id'  v-for='c in categories' :label='c.name' :value='c.id'></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item prop='comment' label='描述' label-width='6em'>
		    	<el-input v-model="cDialog.form.comment"
				  type="textarea"
				  :rows="2"
				  placeholder="请输入内容">
				</el-input>
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
				categories:[],
				loading:false,
				multipleSelection:[],
				cDialog:{
					title:'',
					visible:false,
					form:{}
				},
				rules:{
					name:[{
						required:true,
						message:'请输入用户名',
						trigger:'blur'
					}],
					comment:[{
						required:true,
						message:'请输入描述',
						trigger:'blur'
					}],
					parentId:[{
						required:true,
						message:'请选择父栏目',
						trigger:'change'
					}],
				},
			}
		},
		created(){
			// 查询所有栏目信息
			this.findAllCategories()
		},
		methods:{
			// 修改栏目
			toUpdateCategory(row){
				if (row.parent) {
					row.parentId=row.parent.id
				}
				this.cDialog.form=row;
				this.cDialog.title='修改栏目'
				this.cDialog.visible=true;
			},
			// 保存或修改栏目
			saveOrUpdateCategory(){
				this.$refs.userForm.validate((valid)=>{
					if (valid) {
						axios.post('/manager/category/saveOrUpdateCategory',this.cDialog.form)
						.then(()=>{this.$notify({
					          title: '成功',
					          message: '提交成功',
					          type: 'success'
					        });
							 this.closeCdialog();
							 this.findAllCategories();
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
			// 关闭模态框
			closeCdialog(){
				this.cDialog.form={};
				this.cDialog.visible=false;
			},
			// 添加或修改显示模态框
			toAddCategory(){
				this.cDialog.title = '新增栏目';
				this.cDialog.visible = true;
			},
			// 批量删除
			batchDeleteCategory(){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(()=>{
		        	let ids = this.multipleSelection.map((item)=>{
						return item.id;
					})
					axios.post('/manager/category/batchDeleteCategory',{ids})
					.then(()=>{
						 this.$notify({
				          title: '成功',
				          message: '删除成功',
				          type: 'success'
				        });
						 this.findAllCategories();
					})
					.catch(()=>{
						this.$notify.error({
				          title: '错误',
				          message: '删除失败'
				        });
					})
		        })
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			// 删除id
			deleteCategory(id){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          axios.get('/manager/category/deleteCategoryById?id='+id)
					.then(()=>{
						 this.$notify({
				          title: '成功',
				          message: '删除成功',
				          type: 'success'
				        });
						 this.findAllCategories();
					})
					.catch(()=>{
						this.$notify.error({
				          title: '错误',
				          message: '删除失败'
				        });
					})
		        }).catch(() => {
		                  
		        });
			},
			// 查询所有栏目
			findAllCategories(){
				// 加载图标
				this.loading=true;
				axios.get('/manager/category/findAllCategory')
				.then(({data:result})=>{
					this.categories=result.data;
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