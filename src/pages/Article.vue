<template>
	<div class="article">
		<!-- 按钮区开始 -->
		<div class="btns">
			<el-select v-model="params.categoryId" placeholder="所有栏目" size='mini'clearable style='width:150px;'>
			    <el-option v-for='c in categories' :key='c.id' :value='c.id' :label='c.name'> </el-option>
		    </el-select>
		    <el-input size='mini' style='width:150px;'
			  placeholder="请输入关键字"
			  v-model="params.keywords"
			  clearable>
			   <i slot="prefix" class="el-input__icon el-icon-search"></i>
			</el-input>
			<el-button size='mini' @click='toAddarticle()'>新增</el-button>
			<el-button size='mini' @click='batchDeleteArticle()'>批量删除</el-button>

		</div>
		<!-- 按钮区结束 -->
		<!-- 表格区开始 -->
		<!-- {{params}} -->
		<div class="article_tbl" v-loading='loading'>
			<el-table border size='mini' :data="articles" style="width: 100%"
			@selection-change="handleSelectionChange">
				<el-table-column
			      type="selection"
			      width="40">
			    </el-table-column>
			    <el-table-column
		        prop="id"
		        label="编号"
		        width="60">
		      </el-table-column>
		      <el-table-column
		        prop="title"
		        label="文章标题"
		        width="120">
		      </el-table-column>
		      <el-table-column
		        prop="category.name"
		        label="所属栏目">
		      </el-table-column>
		      <el-table-column
		        prop="author"
		        label="作者">
		      </el-table-column>
		      <el-table-column
		        prop="publishtime"
		        label="发布时间">
		      </el-table-column>
		      <el-table-column
		        prop="readtimes"
		        label="阅读次数">
		      </el-table-column>
		      <el-table-column
		        label="操作" width="100px">
		        <template slot-scope='{row}'>
		        	<i class="fa fa-trash" title="删除" @click='deleteArticle(row.id)'></i>
		        	<i class="fa fa-pencil" title="修改"  @click='toUpdateArticle(row)'></i>
		        </template>
		      </el-table-column>
		    </el-table>
		</div>

		<!-- 表格区结束 -->
		<!-- 分页管理 -->
		<div class="page">
		  <el-pagination
		    layout="prev, pager, next"
		    :page-size='this.params.pageSize'
		    :total="total"
		     @current-change='handleCurrentChange'>
		  </el-pagination>
		</div>
		<!-- 分页管理 -->
		<!-- 模态框开始 -->

 		<el-dialog :title="articleDialog.title" :visible.sync="articleDialog.visible" fullscreen>
 			<!-- {{articleDialog.form}} -->
		  <el-form :model="articleDialog.form" label-position="left">
		    <el-form-item label="标题" label-width="6em">
		      <el-input v-model="articleDialog.form.title" autocomplete="off" style='width: 300px'></el-input>
		    </el-form-item>
			<el-row>
				<el-col :span='12'>
					<el-form-item label='列表样式' label-width='6em'>
				    	<ul class="list_style">
				    		<li class="style_one" :class="{current:articleDialog.form.liststyle=='style-one'}" @click="articleDialog.form.liststyle = 'style-one'">
					      		<img src="@/assets/style-one.jpg" alt="">
					      	</li>
				    		<li class="style_two" :class="{current:articleDialog.form.liststyle=='style-two'}"  @click="articleDialog.form.liststyle = 'style-two'">
					      		<img src="@/assets/style-two.jpg" alt="">
				    		</li>
				    	</ul>
				    </el-form-item>
				</el-col>
				<el-col :span='12'>
					<el-form-item label="咨询栏目" label-width="6em">
				      <el-select v-model="articleDialog.form.categoryId" placeholder="请选择父栏目">
				        <el-option v-for='c in categories' :label="c.name" :value="c.id" :key='c.id'></el-option>
				      </el-select>
				    </el-form-item>
				</el-col>
			</el-row>

		    
		    
		    <el-form-item label='缩略图' label-width="6em">
		    	<el-upload
				  action="http://120.78.164.247:8099/manager/file/upload"
				  :on-success='handleUploadSuccess'
				  list-type="picture">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
		    </el-form-item>
		    <!-- <el-form-item label='列表缩略图' label-width="6em">
		    	<el-upload
				  class="upload-demo"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  
				  list-type="picture">
				  <el-button size="small" type="primary">点击上传</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
		    </el-form-item> -->
		    <el-form-item label='资讯正文' label-width="6em">
		    	<!-- <el-input v-model="articleDialog.form.content"
				  type="textarea"
				  :rows="6"
				  placeholder="请输入内容"></el-input> -->
				  <mavon-editor ref='articleMavon' v-model="articleDialog.form.content"/>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button size='mini' @click='closeCdialog()'>取 消</el-button>
		    <el-button type="primary" @click='saveOrUpdateArticle()'>发 布</el-button>
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
				loading:false,
				categories:[],
				articles:[],
				multipleSelection:[],
				total:10,
				params:{
					page:0,
					pageSize:2,
				},
				articleDialog:{
					title:'',	
					visible:false,
					form:{
						liststyle:'style-one',
						fileIds:[]
					}
				}
			}
		},
		watch:{
			params:{
				handler:function(){
					this.findAllArticles()
				},
				deep:true
			}
		},
		created(){
				this.findAllArticles()
				this.findAllCategories()
			},
		methods:{
			// 成功上传函数
			handleUploadSuccess(response, file, fileList){
				this.articleDialog.form.fileIds.push(response.data.id);
			},
			// 关闭文章模态框
			closeCdialog(){
				this.articleDialog.form={}
				this.articleDialog.visible=false;
			},
			// 保存更新文章
			saveOrUpdateArticle(){
				axios.post('/manager/article/saveOrUpdateArticle',this.articleDialog.form)
				.then(()=>{this.$notify({
			          title: '成功',
			          message: '提交成功',
			          type: 'success'
			        });
					 this.closeCdialog();
					 this.findAllArticles();
				})
				.catch(()=>{
					this.$notify.error({
			          title: '错误',
			          message: '提交失败'
			        });
				})
			},
			// 新增按钮
			toAddarticle(){
				this.articleDialog.title = '发布资讯';
				this.articleDialog.visible = true;
				this.articleDialog.form={
						liststyle:'style-one',
						fileIds:[]
					}
			},
			handleCurrentChange(page){
				this.params.page=page-1;
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			// 批量删除
			batchDeleteArticle(){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(()=>{
		        	let ids = this.multipleSelection.map((item)=>{
		        		return item.id
		        	})
		        	axios.post('/manager/article/batchDeleteArticle',{ids})
					.then(()=>{
						// Notification通知
						this.$notify.success({
				          title: '成功',
				          message: '删除成功'
				        });
				        this.findAllArticles()
					})
					.catch(()=>{
						// Notification通知
						this.$notify.error({
				          title: '错误',
				          message: '删除失败'
				        });
					})
		        })
			},
			// 删除文章
			deleteArticle(id){
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		          
		        }).then(()=>{
		        	axios.get('/manager/article/deleteArticleById?id='+id)
					.then(()=>{
						// Notification通知
						this.$notify.success({
				          title: '成功',
				          message: '删除成功'
				        });
				        this.findAllArticles()
					})
					.catch(()=>{
						// Notification通知
						this.$notify.error({
				          title: '错误',
				          message: '删除失败'
				        });
					})
		        })
				
			},
			// 修改文章
			toUpdateArticle(row){
				let article = _.clone(row);
				article.categoryId=article.category.id
				delete article.category

				for(let key in article){
					let val = article[key];
					if (!val) {
						delete article[key]
					}
				}
				this.articleDialog.form=article;


				this.articleDialog.title='修改文章';
				this.articleDialog.visible=true;
			},
			
			// 查询所有文章
			findAllArticles(){
				// 加载图标
				this.loading=true;
				axios.get('/manager/article/findArticle',{
					params:this.params
				})
				.then(({data:result})=>{
					this.total=result.data.total
					this.articles=result.data.list;
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
			},
			// 查询栏目
			findAllCategories(){
				// 加载图标
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
	.list_style >li {
		width: 200px;
		height: 80px;
		border: 1px solid #ededed;
		border-radius: 3px;
		padding: .5em;
	}
	.list_style >li.current {
		border-color: #409eff;
	}
	.list_style >li img {
		width: 100%;
		cursor: pointer;
	}
	.list_style >li.style_one {
		float: left;
	}
	.list_style >li.style_two {
		margin-left: 220px;
	}
</style>
