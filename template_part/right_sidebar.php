<?php
/*
 * Right sidebar of any page
 *
 */
?>                   
<?php if($this->countModules('right-column-1 or right-column-2 or right-column-3')) : ?>
   <aside>
    <div class="col-sm-4 sidebar-right hidden-xs hidden-sm">
        <?php if($this->countModules('right-column-1')) : ?>
            <div class="col-sm-12 sidebar">
                <jdoc:include type="modules" name="right-column-1"/>
            </div> 
        <?php endif; ?>
        <?php if($this->countModules('right-column-2')) : ?>
            <div class="col-sm-12 sidebar">
                <jdoc:include type="modules" name="right-column-2"/>
            </div> 
        <?php endif; ?>
        <?php if($this->countModules('right-column-3')) : ?>
            <div class="col-sm-12 sidebar">
                <jdoc:include type="modules" name="right-column-3"/>
            </div> 
        <?php endif; ?>
    </div>
    </aside>
<?php endif; ?>