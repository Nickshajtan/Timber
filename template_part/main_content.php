<?php
/**
* This template part for content zone of page
*
*/
?>
<?php
if(($this->countModules('left-column-1 + left-column-2 + left-column-3') == 0 ) && ($this->countModules('right-column-1 + right-column-2 + right-column-3') == 0 ))
{$contpage = "12";}
elseif(($this->countModules('left-column-1 + left-column-2 + left-column-3') == 0 ) || ($this->countModules('right-column-1 + right-column-2 + right-column-3') == 0 ))
{$contpage = "10";}
else{$contpage = "8";}
?>
<div class="col-sm-12 col-md-<?php echo $contpage; ?> col-lg-<?php echo $contpage; ?> ">
    <div class="content-wrapper" itemscope itemtype="http://schema.org/Article" itemprop="articleBody">
        <!--Error message-->
        <jdoc:include type="message"/>
        <!--Content-->
        <article>
            <jdoc:include type="component"/>
        </article>
    </div>
</div>