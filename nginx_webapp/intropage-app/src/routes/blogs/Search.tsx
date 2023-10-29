import { ThemeProvider } from '@mui/material/styles';
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch } from '../../redux/hooks';
import { loading, done } from '../../redux/feature/LoadingReducer';
import { CallAPI, Posts_APIResponse, isPostsAPIResponse } from "../../funcs/CallAPI";
import { Link } from 'react-router-dom';
import { Chip, Pagination } from "@mui/material";
import { SearchRounded } from '@material-ui/icons';
import * as S from '../../styles/Search_Style';
import Footer from '../../components/Footer';
function Search()
{
    const [searchjson, setSearchjson] = useState({} as Posts_APIResponse)
    const [searchParams] = useSearchParams();
    const [paginationIndex, setPaginationIndex] = useState<number>(0);
    const titlevalue = searchParams.get('t');
    const userid = searchParams.get('u');
    const categoryid = searchParams.get('c');
    const tagid = searchParams.get('ag');
    const datevalue = searchParams.get('d');
    const dispatch = useAppDispatch();

    const handleImageError = (e : any) => {
        e.target.src = "/No_Image.jpg"
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
        setPaginationIndex(page-1);
    }

    const pagemax = 5;

    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    useEffect(() =>  {
        (async () => {
            dispatch(loading());
            var query = "";
            if(titlevalue && typeof titlevalue == 'string')
                query += `title=${encodeURIComponent(titlevalue)}&`;

            if(userid && typeof userid == 'string')
                query += `userid=${encodeURIComponent(userid)}&`;

            if(categoryid && typeof categoryid == 'string')
                query += `categoryid=${encodeURIComponent(categoryid)}&`;

            if(tagid && typeof tagid == 'string')
                query += `tagid=${encodeURIComponent(tagid)}&`;

            if(datevalue && typeof datevalue == 'string')
                query += `created_at=${encodeURIComponent(datevalue)}&`;

            const posts = await CallAPI({APIType:"PostList", Method:"GET", Query:query});
            if(isPostsAPIResponse(posts))
                setSearchjson(posts);
            dispatch(done());
        })();
    }, [])
    
    return (
        <S.SearchBox>
            <ThemeProvider theme={S.theme}>
                <S.SectionBanner>
                    <S.BannerBox>
                        <S.SearchIconBox>
                            <SearchRounded style={{width: 128, height: 128}}/>
                        </S.SearchIconBox>
                        <S.SearchResultCountBox>
                            <S.SearchResultTitle variant="h4" noWrap={true}>
                                키워드: {titlevalue !== "" ? titlevalue : "All"}
                            </S.SearchResultTitle>
                            <S.SearchResultSubTitle variant="h5">
                                검색 결과 - {searchjson?.posts?.length.toString()} 개.
                            </S.SearchResultSubTitle>
                        </S.SearchResultCountBox>
                    </S.BannerBox>
                </S.SectionBanner>
                <S.SectionSearchResult>
                    <S.SearchPostsContainer>
                        <S.SearchPostStack spacing={1}>
                            {searchjson?.posts?.slice(0+(pagemax*paginationIndex),pagemax+(pagemax*paginationIndex)).map((item, index) => (
                                <Link key={index} to={"/post/" + item.postid} style={{ textDecoration: 'none', color: 'black' }}>
                                    <S.SearchPostPaper>
                                        <S.SearchPostImage src={typeof item.thumbnailurl == 'string' && regex.test(item.thumbnailurl) ? item.thumbnailurl : "No_image.jpg"} onError={handleImageError}/>
                                        <S.SearchPostMainBox>
                                            <Chip label={item.categoryid != null && item.categoryid !== "" ? item.categoryid : "No Set"} style={{ width: 'min-content' }}/>
                                            <S.SearchPostTitleTypography variant="h5">
                                                {item.title}
                                            </S.SearchPostTitleTypography>
                                            <S.SearchPostContentTypography>
                                                {item.content}
                                            </S.SearchPostContentTypography>
                                            <S.SearchPostTagTypography variant="subtitle2" color="gray">
                                                { item.tagid.length > 0 ? item.tagid.map((tag) => ("#" + tag + " ")) : "#NoTag"}
                                            </S.SearchPostTagTypography>
                                            <S.SearchPostDateBox>
                                                <S.SearchPostDateIcon/>
                                                <S.SearchPostDateTypography>
                                                    {item.created_at.slice(0, 19).replace(/[T.]/g, ' / ')}
                                                </S.SearchPostDateTypography>
                                            </S.SearchPostDateBox>
                                            <S.SearchPostAuthorBox>
                                                <S.SearchPostAuthorTypography variant='subtitle2'>
                                                    Author: {item.userid}
                                                </S.SearchPostAuthorTypography>
                                            </S.SearchPostAuthorBox>
                                        </S.SearchPostMainBox>
                                    </S.SearchPostPaper>
                                </Link>
                            ))}
                        </S.SearchPostStack>
                        <S.PostPaginationBox>
                            <Pagination onChange={handlePagination} count={Math.ceil(searchjson?.posts?.length / 5)} variant="outlined" color="primary" size="large" sx = {{ width: "auto"}}/>
                        </S.PostPaginationBox>
                    </S.SearchPostsContainer>
                </S.SectionSearchResult>
                <Footer />
            </ThemeProvider>
        </S.SearchBox>
    );
}

export default Search;