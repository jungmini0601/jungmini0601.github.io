import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled'

const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-size: 20px;
  }
`
// css를 이용하여 Style을 지정할 수 있다!
const TextStyle = css`
  font-size: 18px;
  font-weight: 700;
  color: gray;
`

const Text1 = styled.div<{ disable: boolean }>`
  font-size: 20px;
  font-weight: 700;
  text-decoration: ${({ disable }) => (disable ? 'line-through' : 'none')};
`

const Text2 = styled('div')<{ disable: boolean }>(({ disable }) => ({
  fontSize: '15px',
  color: 'blue',
  textDecoration: disable ? 'line-through' : 'none',
}))

type InfoPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: string
      }
    }
  }
}

const InfoPage: FunctionComponent<InfoPageProps> = function ({
  data: {
    site: {
      siteMetadata: { title, description, author },
    },
  },
}) {
  return (
    <div>
      {/* Emotion을 이용하여 Global Style을 지정할 수 있다! */}
      <Global styles={globalStyle} />
      <Text1 disable>{description} </Text1>
      <Text2 disable>{author}</Text2>
      {/* Gatsby는 Prefetch를 통해 정적 페이지에서 사용할 리소스의 로딩 속도를 높인다고 한다 현재 페이지에서 사용되는 모든 링크를 찾아서 미리 로딩한다는 뜻이다! */}
      {/* <Link to="/">To Index</Link> */}
    </div>
  )
}

// 아래와 같이 Query를 변수에 담아 export하면 Gatsby 내부적으로 요청을 보낸후 응답 데이터를 Props로 보내준다.
export const metadataQuery = graphql`
  query InfoPageQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`

export default InfoPage
