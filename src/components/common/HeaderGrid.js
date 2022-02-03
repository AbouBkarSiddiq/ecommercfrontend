import React from 'react'

const HeaderGrid = ({name}) => {
    return (
        <section class="inner_page_head">
            <div class="container_fuild">
                <div class="row">
                    <div class="col-md-12">
                        <div class="full">
                            <h3>{name}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeaderGrid
