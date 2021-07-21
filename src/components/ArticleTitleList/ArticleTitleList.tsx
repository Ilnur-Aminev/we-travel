import React from 'react'
import Anchor from '@components/Anchor'
import OrderedList from '@components/Lists/List.Ordered'

export interface ArticleTitleListProps {
    items?: Record<'title' | 'url', string | undefined>[];
}

const ArticleTitleList = ({ items }: ArticleTitleListProps) => {
    return(
        <OrderedList>
            {items?.map(({ title, url }) => {
                return (
                    <li key={title}>
                        <Anchor href={`#${url}`}>{title}</Anchor>
                    </li>
                )
            })}
        </OrderedList>
    )
}

export default ArticleTitleList