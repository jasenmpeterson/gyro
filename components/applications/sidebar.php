<?php
/**
 * Created by IntelliJ IDEA.
 * User: jasen
 * Date: 3/19/18
 * Time: 12:49 PM
 */
$contacts = new \supportContacts\supportContacts();
?>
<div class="col sidebar left">
    <aside>
        <div class="content__wrap">
	        <?php
                $sideBar = new \sideBar\sideBar();
                $displaySideBar = $sideBar->get_posts_children(505, 1);
	        ?>
        </div>
        <div class="content__wrap contact">
            <?php echo $contacts->getContacts();?>
        </div>
    </aside>
</div>