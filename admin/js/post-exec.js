/* executed for
 /wp-admin/post.php
 /wp-admin/post-new.php
*/
jQuery(document).ready(
function(){
	var qtx = qTranslateConfig.js.get_qtx();
	//co('post.php: qtx: ',qtx);

	// Slug
	var convertURL = function(url,lang)
	{
		switch (qTranslateConfig.url_mode.toString())
		{
		case '1':
			if (url.search){
				url.search+="&lang="+lang;
			}else{
				url.search="?lang="+lang;
			}
			break;
		case '2':
			var homepath=qTranslateConfig.url_info_home;
			var i=url.pathname.indexOf(homepath);
			url.pathname=homepath+lang+url.pathname.substring(i+homepath.length-1);
			break;
		case '3':
			url.host=lang+'.'+url.host;
			break;
		case '4':
			url.host=qTranslateConfig.domains[lang];
			break;
		}
	}

	var btnViewPostA;//a node of 'View Page/Post' link.
	var origUrl, langUrl;
	var slugSamplePermalink;//'sample-permalink' node
	var origSamplePermalink;
	var setSlugLanguage=function(lang)
	{
		if(!btnViewPostA){
			var btnViewPost=document.getElementById('view-post-btn');
			if (!btnViewPost || !btnViewPost.children.length) return;
			btnViewPostA=btnViewPost.children[0];
			if(btnViewPostA.tagName != 'A') return;
			origUrl=btnViewPostA.href;
			langUrl=qtranxj_ce('a',{});
		}

		langUrl.href=origUrl;
		convertURL(langUrl,lang);
		btnViewPostA.href=langUrl.href;

		var btnPreviewAction=document.getElementById('preview-action');
		if (btnPreviewAction && btnPreviewAction.children.length)
		{
			btnPreviewAction.children[0].href=langUrl.href;
		}

		if(qTranslateConfig.url_mode!=1){//!QTX_URL_QUERY
			if(!slugSamplePermalink){
				var slugEl=document.getElementById('sample-permalink');
				if (slugEl && slugEl.childNodes.length){
					slugSamplePermalink=slugEl.childNodes[0];//span
					origSamplePermalink=slugSamplePermalink.nodeValue;
					//var slugEdit=document.getElementById('editable-post-name');
				}
			}
			if(slugSamplePermalink){
				langUrl.href=origSamplePermalink;
				convertURL(langUrl,lang);
				slugSamplePermalink.nodeValue=langUrl.href;
			}
		}
	}

	//handle prompt text of empty field 'title', not important
	var field_title = jQuery('#title');
	var title_label = jQuery('#title-prompt-text');
	var hide_title_prompt_text=function(lang)
	{
		var value = field_title.attr('value');
		//co('hide_title_prompt_text: title.value: ',value);
		if(value){
			title_label.addClass('screen-reader-text');
		}else{
			title_label.removeClass('screen-reader-text');
		}
		//jQuery('#title-prompt-text').remove();//ok
		//this.delLanguageSwitchAfterListener(hide_title_prompt_text);//ok
	}

	qtx.addCustomContentHooks();//handles values of option 'Custom Fields'
	setSlugLanguage(qtx.getActiveLanguage());

	qtx.addLanguageSwitchAfterListener(setSlugLanguage);

	if(title_label && field_title){
		qtx.addLanguageSwitchAfterListener(hide_title_prompt_text);
	}
});
