<?php

namespace TAMACHI;

get_header();

?>

<article id="tamachi-post">

	<div id="tamachi-post-header">
		<h1 id="tamachi-post-title"><?php
			esc_html_e( 'Oops! That page can&rsquo;t be found.', 'tamachi' );
		?></h1>
	</div>

	<div id="tamachi-post-content"><?php
		esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links in the sidebar or a search?', 'tamachi' );
	?></div>

<?php

get_footer();
