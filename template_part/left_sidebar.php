<?php
/*
 * Left sidebar of any page
 *
 */
?>                   
<?php if($this->countModules('left-column-1 or left-column-2 or left-column-3')) : ?>
   <aside>
    <div class="col-sm-4 sidebar-left hidden-xs hidden-sm">
        <?php if($this->countModules('left-column-1')) : ?>
            <div class="col-sm-12 sidebar">
                <jdoc:include type="modules" name="left-column-1"/>
            </div> 
        <?php endif; ?>
        <?php if($this->countModules('left-column-2')) : ?>
            <div class="col-sm-12 sidebar">
                <jdoc:include type="modules" name="left-column-2"/>
            </div> 
        <?php endif; ?>
        <?php if($this->countModules('left-column-3')) : ?>
            <div class="col-sm-12 sidebar">
                <jdoc:include type="modules" name="left-column-3"/>
            </div> 
        <?php endif; ?>
    </div>
    </aside>
<?php endif; ?>